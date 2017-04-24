import express from 'express';
const handle = require('./handlers');
const checkAuthStatus = require('connect-ensure-login').ensureLoggedIn();
const upload = require('../../helpers/file_upload');
const router = express.Router();

router.route('/')
  .get(handle.getStatistics);

export default router;