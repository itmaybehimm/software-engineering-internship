import { Router } from 'express';
import { getAllUsers, registerUser } from '../controllers/user.controller';

const router = Router();

router.use('/', getAllUsers);
router.use('/register', registerUser);

export default router;
