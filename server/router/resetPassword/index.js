import express from 'express';
import { resetPassword, sendLink } from './handlers';

const router = express.Router();

router.post('/', resetPassword);
router.post('/sendLink', sendLink);

export default router;