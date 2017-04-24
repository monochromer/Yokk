import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/')
  .get(handle.timeEntryBatch)
  .post(handle.saveTimeEntry);
router.route('/:timeEntryId')
  .delete(handle.deleteTimeEntry)
  .put(handle.updateTimeEntry);

export default router;