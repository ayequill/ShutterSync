import mongoose from 'mongoose';
import sha1 from 'crypto-js/sha1.js';
import Album from './album.model.js';
// Create a schema for user
const USER_SCHEMA = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already taken',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
  hashed_password: {
    type: String,
    required: 'Password is required',
  },
  salt: String,
  avatar: String,
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album',
    },
  ],
});

USER_SCHEMA.virtual('password')
  .set(async function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = sha1(this._password, this.salt);

    console.log(this.salt, this.hashed_password);
  })
  .get(function () {
    return this._password;
  });

USER_SCHEMA.path('hashed_password').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

USER_SCHEMA.methods = {
  authenticate(plainText) {
    const hashedInput = sha1(plainText, this.salt);
    return hashedInput.toString() === this.hashed_password;
  },
  makeSalt() {
    return `${Math.round(new Date().valueOf() * Math.random())}`;
  },
};

export default mongoose.model('User', USER_SCHEMA);
