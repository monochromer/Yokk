import express from 'express';
const handle = require('./handlers');
const upload = require('../../helpers/file_upload');
const router = express.Router();

router.route('/')
  .get(handle.getAllUsers)
  .post(handle.saveUserToDb);
router.route('/get/team')
  .get(handle.getTeamUsers);
router.route('/check_permissions')
  .get(handle.checkUserPermissions);
router.route('/:id')
  .get(handle.showUser)
  .put(handle.updateUser)
  .delete(handle.deleteUser);
router.route('/:user_login/upload_profile_picture')
  .post(upload.single('pic'), handle.uploadUserAvatar)
  .delete(handle.deleteUserAvatar);

export default router;