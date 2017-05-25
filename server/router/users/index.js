import express from 'express';
const handle = require('./handlers');
const upload = require('../../helpers/file_upload');
const router = express.Router();

router.route('/')
  .get(handle.getAllUsers)
  .post(handle.saveUserToDb);
router.route('/:_id')
  .put(handle.updateUser)
  .delete(handle.deleteUser);
router.route('/:_id/upload_profile_picture')
  .post(upload.single('pic'), handle.uploadUserAvatar)
  .delete(handle.deleteUserAvatar);

export default router;
