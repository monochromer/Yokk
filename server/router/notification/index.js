import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/')
  .get(handle.fetchNotifications)
  .post(handle.markAllNotifications);
router.route('/:_id')
  .post(handle.markNotification);

export default router;
