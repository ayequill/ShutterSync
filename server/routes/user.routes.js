import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import userAuth from '../controllers/auth.controller.js';
import albumCtrl from '../controllers/album.controller.js';
import photoCtrl from '../controllers/photo.controller.js';

const router = express.Router();

router.route('/api/users').post(userCtrl.create);
router.route('/api/users').get(userCtrl.list);

router
  .route('/api/users/:userId')
  .get(userAuth.requireSignIn, userCtrl.read)
  .put(userAuth.requireSignIn, userAuth.isAuthorized, userCtrl.update)
  .delete(userAuth.requireSignIn, userAuth.isAuthorized, userCtrl.remove);

router
  .route('/api/users/:userId/albums')
  .post(userAuth.requireSignIn, albumCtrl.createAlbum)
  .get(userAuth.requireSignIn, albumCtrl.getAlbums);

router
  .route('/api/users/:userId/albums/:albumId')
  .get(userAuth.requireSignIn, albumCtrl.getAlbum)
  .delete(userAuth.requireSignIn, albumCtrl.deleteAlbum)
  .put(userAuth.requireSignIn, albumCtrl.updateAlbum);

router
  .route('/api/users/:userId/albums/:albumId/photo')
  .post(userAuth.requireSignIn, photoCtrl.addPhoto);

router
  .route('/api/users/:userId/albums/:albumId/photo/:photoId')
  .delete(userAuth.requireSignIn, photoCtrl.deletePhoto);

router
  .route('/api/photos/:photoId')
  .get(photoCtrl.getPhoto)
  .put(photoCtrl.updatePhoto)
  .delete(photoCtrl.deletePhoto);

router.param('userId', userCtrl.userByID);
router.param('albumId', albumCtrl.albumByID);
router.param('photoId', photoCtrl.photoById);

export default router;
