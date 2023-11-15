import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import dotenv, { config } from 'dotenv';
import User from '../models/user.model.js';

dotenv.config();

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'User not found. Please sign up!',
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email or password don't match.",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('t', token, { httpOnly: true, maxAge: 9999 });

    return res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(401).json({
      error: 'Error signing in. Try again.',
    });
  }
};

const signout = (req, res) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'Signed out',
  });
};

const requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

const isAuthorized = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};

export default {
  signIn,
  signout,
  requireSignIn,
  isAuthorized,
};
