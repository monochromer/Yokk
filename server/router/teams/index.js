import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/')
  .post(handle.create)
  .get(handle.read);
router.route('/:teamId')
  .put(handle.update)
  .delete(handle.delete);
router.route('/addTeamMembers')
  .post(handle.addTeamMembers);
// router.route('/removeTeamMember')
//   .post(handle.removeTeamMember);
// router.route('/addManager')
//   .post(handle.addManager);
// router.route('/removeManager')
//   .post(handle.removeManager);

export default router;
