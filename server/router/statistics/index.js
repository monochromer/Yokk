import express from 'express';
const handle = require('./handlers');
const router = express.Router();

router.route('/')
  .get(handle.getStatistics);

export default router;