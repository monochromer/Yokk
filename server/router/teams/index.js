import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/getTeamsFor/:companyId')
  .get(handle.getTeamsForCompany);
router.route('/addTeamMembers')
  .post(handle.addTeamMembers);
router.route('/changeName')
  .put(handle.changeName);
router.route('(/:teamName)?')
  .post(handle.create)
  .get(handle.read)
  .put(handle.update)
  .delete(handle.delete);
router.route('/:teamName/email/:email')
  .delete(handle.deleteMeberFromTeam);
router.route('/resendCode')
  .get(handle.resendCode);

export default router;