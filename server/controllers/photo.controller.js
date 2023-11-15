import Photo from '../models/photo.model.js';
import Album from '../models/album.model.js';
import { upload } from '../app.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: 'dzpjlfcrq',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPhoto = async (req, res) => {
  try {
    const { album } = req;
    let photoObjs = { album: album._id };

    // Use multer middleware for handling file upload
    upload.single('photo')(req, res, async (err) => {
      try {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({
            error: err.message,
          });
        } else if (err) {
          return res.status(400).json({
            error: err.message,
          });
        }

        // Upload image to cloudinary
        cloudinary.uploader.upload(
          req.file.path,
          { public_id: req.originalname, quality: 'auto:best' },
          async function (error, result) {
            if (!error) {
              photoObjs = {
                ...photoObjs,
                imageUrl: result.secure_url,
                size: result.bytes,
                public_id: result.public_id,
                name: result.original_filename,
                created_at: result.created_at,
              };
              const photo = new Photo(photoObjs);

              await photo.save();
              album.photos.push(photo);
              await album.save();
              res.json(photo);
            }
          }
        );
      } catch (e) {
        return res.status(500).json({
          error: e.message,
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};

const photoById = async (req, res, next, id) => {
  try {
    console.log(req);
    const photo = await Photo.findById(id).populate('album').exec();
    if (!photo) {
      return res.status(404).json({
        error: 'Photo not found',
      });
    }
    req.photo = photo;
    next();
  } catch (e) {
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const getPhoto = (req, res) => {
  try {
    res.json(req.photo);
  } catch (e) {
    return res.json(400).json({
      error: e,
    });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const { photo, album } = req;
    // const delPhoto = await photo.remove()
    await Album.findByIdAndUpdate(
      album._id,
      { $pull: { photos: photo._id.toString() } },
      { new: true }
    );
    await Photo.deleteOne(photo);
    cloudinary.api
      .delete_resources([photo.public_id], {
        type: 'upload',
        resource_type: 'image',
      })
      .then((data) => res.status(201).json(data.deleted));
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const { photo } = req;
    console.log(photo);
    photo.imageUrl = req.body.imageUrl;
    photo.caption = req?.body?.caption;
    await photo.save();
    res.json(photo);
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

export default { addPhoto, photoById, getPhoto, deletePhoto, updatePhoto };
