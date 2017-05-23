import express from 'express';
import { registerCompany, registerUser } from './handlers';

const router = express.Router();

router.post('/', registerCompany);
router.post('/user', registerUser);

export default router;
