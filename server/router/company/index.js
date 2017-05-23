import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/')
  .post(handle.create)
  .get(handle.read);
router.route('/:companyId')
  .put(handle.update)
  .delete(handle.delete);

export default router;
