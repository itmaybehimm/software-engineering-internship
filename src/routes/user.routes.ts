import { Router } from 'express';
import { userController } from '../controllers/user/user.controller';
import passport from 'passport';

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);
router.post('/register', userController.registerUser);

export default router;
