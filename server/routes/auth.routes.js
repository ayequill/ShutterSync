/* Authentication middlewares */
import express from 'express';
import userAuth from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/auth/signin').post(userAuth.signIn);
router.route('/auth/signout').get(userAuth.signout);
router.route('/auth/verify').get(userAuth.confirmEmail);
router.route('/auth/reset').put(userAuth.resetPassword);
router.route('/auth/reset').post(userAuth.forgotPassword);

export default router;
