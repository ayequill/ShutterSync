import Photo from '../models/photo.model.js';
import Album from '../models/album.model.js';
import { upload } from '../app.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Storage, TransferManager } from '@google-cloud/storage';
import path from 'path';
dotenv.config();

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID } =
  process.env;

const GOOGLE_PRIVATE_KEY_NEWLINE = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

cloudinary.config({
  cloud_name: 'dzpjlfcrq',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const bucketName = 'shuttersync-storage';

const googleStorage = new Storage({
  projectId: GOOGLE_PROJECT_ID,
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY_NEWLINE,
  },
});

const bucket = googleStorage.bucket(bucketName);
const transferManager = new TransferManager(bucket);

const addPhoto = async (req, res) => {
  try {
    const { album } = req;
    let photoObjs = { album: album._id };

    // Use multer middleware for handling file upload
    upload.array('photos')(req, res, async (err) => {
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
        const albumFolder = album._id.toString();
        const filePaths = req.files.map((file) => file.path);

        await transferManager.uploadManyFiles(filePaths, albumFolder);

        const publicUrls = req.files.map((file) => {
          const photoFileName = path.basename(file.path);
          return `https://storage.googleapis.com/${bucketName}/public/images/${photoFileName}`;
        });
        const uploadPromises = req.files.map(async (file, index) => {
          return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
              file.path,
              {
                tags: albumFolder,
                transformation: { width: 800, fetch_format: 'auto' },
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve({
                    ...photoObjs,
                    imageUrl: result.secure_url,
                    size: result.bytes,
                    public_id: result.public_id,
                    name: result.original_filename,
                    created_at: result.created_at,
                    storageUrl: publicUrls[index],
                  });
                }
              }
            );
          });
        });
        const uploadedPhotos = await Promise.all(uploadPromises);
        const photos = await Photo.insertMany(uploadedPhotos);
        album.photos.push(...photos);
        await album.save();
        return res.json(photos);
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          error: e.message,
        });
      }
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: e.message,
    });
  }
};

const photoById = async (req, res, next, id) => {
  try {
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
    const { photo } = req;
    // const delPhoto = await photo.remove()
    const deletedAlbum = await Album.findByIdAndUpdate(
      photo.album._id.toString(),
      { $pull: { photos: photo._id.toString() } },
      { new: true }
    );
    await Photo.deleteOne(photo);
    cloudinary.api.delete_resources([photo.public_id], {
      type: 'upload',
      resource_type: 'image',
    });
    // .then((data) => res.status(201).json({ data }));
    return res
      .status(201)
      .json({ album: deletedAlbum, message: 'Photo deleted successfully' });
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
