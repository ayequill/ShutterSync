import userCtrl from '../controllers/user.controller.js';
import express from "express";

const router = express.Router()

router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.route('/api/users/:userId')
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove)
router.param('userId', userCtrl.userByID)


export default router
