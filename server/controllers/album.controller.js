import Album from '../models/album.model.js';
import dbErrorHandler from '../helpers/dbErrorHandler.js';
import User from '../models/user.model.js';
import Photo from '../models/photo.model.js';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dzpjlfcrq',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create an album
const createAlbum = async (req, res) => {
  try {
    const user = req.profile;
    const newAlbum = new Album({
      name: req.body.name,
    });
    user.albums.push(newAlbum);
    await newAlbum.save();
    await user.save();
    res.json(newAlbum);
  } catch (e) {
    res.status(500).json({
      error: 'Internal Server Error',
    });
    console.log(e);
  }
};

// Get all albums a user has
const getAlbums = async (req, res) => {
  try {
    const userAlbums = await User.findById(req.profile._id.toString())
      .populate({
        path: 'albums',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'photos',
        },
      })
      .exec();
    res.json(userAlbums.albums);
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

// Get particular album id
const albumByID = async (req, res, next, id) => {
  try {
    const album = await Album.findById(id).populate('photos');
    if (!album) {
      return res.status(404).json({
        error: 'Album not found',
      });
    }
    req.album = album;
    next();
  } catch (e) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

// Get a particular album
const getAlbum = (req, res) => {
  try {
    const album = req.album;
    res.json(album);
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { profile, album } = req;
    await User.findByIdAndUpdate(
      profile._id,
      { $pull: { albums: album._id.toString() } },
      { new: true }
    );
    const photos = await album.populate('photos');

    const public_ids = photos.photos.map((photo) => photo.public_id);
    if (public_ids.length > 0) {
      await cloudinary.api
        .delete_resources_by_tag(album._id.toString())
        .then((result) => {
          console.log(result);
        });
    }
    await Photo.deleteMany({ album: album._id });
    await Album.deleteOne(album._id);
    res.json({
      message: 'Album successfully deleted',
    });
  } catch (e) {
    return res.status(404).json({
      error: e,
    });
  }
};

const updateAlbum = async (req, res) => {
  try {
    const { album } = req;
    album.name = req.body.name;
    await album.save();
    res.json(album);
  } catch (e) {
    return res.status(400).json({
      error: 'error',
    });
  }
};

export default {
  createAlbum,
  getAlbums,
  albumByID,
  getAlbum,
  deleteAlbum,
  updateAlbum,
};
