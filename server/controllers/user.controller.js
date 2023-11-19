import extend from 'lodash/extend.js';
import User from '../models/user.model.js';
import { v4 as genId } from 'uuid';
import dbErrorHandler from '../helpers/dbErrorHandler.js';
import { sendMail, html } from '../helpers/sendMail.js';

const create = async (req, res, next) => {
  // Get user details from req.body
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      error: 'Name, email and password are required',
    });
  }

  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      error: `${userExist.email} is already taken`,
    });
  }

  const user = new User({ name, email, password, token: genId() });
  try {
    await user.save();
    const subject = 'Welcome to ShutterSync 😎';
    const link = `https://shuttersync.live/verify/${user.token}`;
    await sendMail(email, subject, html(name, link));
    return res.status(200).json({
      message: 'Successfully signed up',
    });
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created_at albums');
    res.json(users);
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: 'User not found!',
      });
    }
    req.profile = user;
    next();
  } catch (e) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user = extend(user, req.body);
    user.updated_at = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(201).json(user);
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

const remove = async (req, res) => {
  try {
    const user = req.profile;
    await User.deleteOne(user);
    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(201).json(user);
  } catch (e) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(e),
    });
  }
};

export default {
  create,
  list,
  userByID,
  read,
  update,
  remove,
};
