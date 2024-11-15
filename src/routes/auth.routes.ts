import { Router } from 'express';
import passport from 'passport';

import { userService } from '../modules/user/user.module';
import { AuthController } from '../modules/auth/controllers/auth.controller';

export const authRouter = Router();
const authController = new AuthController(userService);

authRouter.post('/login', passport.authenticate('local', { session: false }), authController.login);

authRouter.post(
  '/refresh-token',
  passport.authenticate('jwt-refresh', { session: false }),
  authController.refreshToken,
);

authRouter.post('/register', authController.register);
