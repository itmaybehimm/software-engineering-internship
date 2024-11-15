import { Router } from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/roles.middleware';
import { ROLE } from '../enums/user-role.enum';
import { userController } from '../containers/container';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.getAllUsers,
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.getAllUsers,
);

router.post('/register', userController.registerUser);

export default router;
