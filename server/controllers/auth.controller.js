import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import dbErrorHandler from '../helpers/dbErrorHandler.js';
import { sendMail, resetPasswordHTML } from '../helpers/sendMail.js';
import { v4 } from 'uuid';

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

const confirmEmail = async (req, res) => {
  try {
    const token = req.query.token;
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid token',
      });
    }
    user.verified = true;
    await user.save();
    return res.status(200).json({
      message: 'Email confirmed',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: 'User not found',
      });
    }

    const token = v4();
    user.token = token;
    await user.save();

    const subject = 'Reset your password';
    const link = `https://shuttersync.live/forgot-password/${token}`;
    await sendMail(email, subject, resetPasswordHTML(user.name, link));
    return res.status(200).json({
      message: 'Email sent',
    });
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    if (!email || !password || !newPassword) {
      return res.status(400).json({
        error: 'Email, password and new password are required',
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: 'You are not registered. Please sign up!',
      });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({
      message: 'Password updated!',
    });
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

export default {
  signIn,
  signout,
  requireSignIn,
  resetPassword,
  isAuthorized,
  confirmEmail,
  forgotPassword,
};
