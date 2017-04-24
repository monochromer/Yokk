import express from 'express';
const router = express.Router();
const handle = require('./handlers');

router.route('/').get(handle.createReport);

export default router;