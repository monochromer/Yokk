import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('(/:companyName)?')
  .post(handle.create)
  .get(handle.read)
  .put(handle.update)
  .delete(handle.delete);

router.route('/add')
  .post(handle.add);

export default router;