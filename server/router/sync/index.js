import express from 'express';
const redmine = require('./redmine');
const upwork = require('./upwork');
const router = express.Router();

router.route('/redmine').get(redmine);
router.route('/upwork').get(upwork);

export default router;