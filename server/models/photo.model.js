import mongoose from 'mongoose';

const PHOTOS_SCHEMA = new mongoose.Schema({
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  caption: String,
});

export default mongoose.model('Photo', PHOTOS_SCHEMA);
