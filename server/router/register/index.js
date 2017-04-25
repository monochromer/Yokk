import express from 'express';
import { register } from './handlers';

const router = express.Router();

router.post('/', register);

export default router;