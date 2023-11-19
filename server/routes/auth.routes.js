/* Authentication middlewares */
import express from 'express';
import userAuth from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/auth/signin').post(userAuth.signIn);
router.route('/auth/signout').get(userAuth.signout);
router.route('/auth/verify').get(userAuth.confirmEmail);

export default router;
