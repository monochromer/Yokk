import express from 'express';
const handle = require('./handlers');
const router = express.Router();

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