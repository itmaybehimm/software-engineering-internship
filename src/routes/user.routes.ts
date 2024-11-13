import { Router } from 'express';
import { getAllUsers, registerUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/register', registerUser);

export default router;
