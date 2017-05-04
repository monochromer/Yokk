import express from 'express';
const handle = require('./handlers');
const upload = require('../../helpers/file_upload');
const router = express.Router();

router.route('/')
  .get(handle.getAllUsers)
  .post(handle.saveUserToDb);
router.route('/get/team')
  .get(handle.getTeamUsers);
router.route('/logged_in_user')
  .get(handle.getLoggedInUser);
router.route('/:_id')
  .get(handle.showUser)
  .put(handle.updateUser)
  .delete(handle.deleteUser);
router.route('/:_id/upload_profile_picture')
  .post(upload.single('pic'), handle.uploadUserAvatar)
  .delete(handle.deleteUserAvatar);

export default router;