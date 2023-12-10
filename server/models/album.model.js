import mongoose from 'mongoose';

const ALBUM_SCHEMA = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Album needs a name!',
      unique: 'Album exist!',
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Album', ALBUM_SCHEMA);
