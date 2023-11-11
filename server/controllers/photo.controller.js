import Photo from '../models/photo.model.js';

const addPhoto = async (req, res) => {
  try {
    const { album } = req;
    const photo = new Photo({ ...req.body, album });

    await photo.save();
    album.photos.push(photo);
    await album.save();
    res.json(photo);
  } catch (e) {
    return res.status(500).json({
      error: e,
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
    await Photo.deleteOne(photo);
    res.status(201).json(photo);
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
