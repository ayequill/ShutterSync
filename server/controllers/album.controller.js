import Album from '../models/album.model.js';
import dbErrorHandler from '../helpers/dbErrorHandler.js';
import User from '../models/user.model.js';
import Photo from '../models/photo.model.js';

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
      .populate('albums')
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
    const album = await Album.findById(id);
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
    await Photo.deleteMany({ album: album._id });
    const delAlbum = await Album.deleteOne(album);
    res.json(delAlbum);
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
