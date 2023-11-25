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
  },
  { timestamps: true }
);

export default mongoose.model('Album', ALBUM_SCHEMA);
