import userCtrl from '../controllers/user.controller.js';
import userAuth from '../controllers/auth.controller.js'
import express from "express";

const router = express.Router()

router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users/:userId')
    .get(userAuth.requireSignIn, userCtrl.read)
    .put(userAuth.requireSignIn,userAuth.isAuthorized, userCtrl.update)
    .delete(userAuth.requireSignIn,userAuth.isAuthorized, userCtrl.remove)
router.param('userId', userCtrl.userByID)


export default router
