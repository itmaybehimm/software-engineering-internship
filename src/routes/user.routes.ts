import { Router } from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/roles.middleware';
import { ROLE } from '../enums/user-role.enum';
import { userController, userService } from '../modules/user/user.module';
import { checkOwnership } from '../middlewares/ownership.middleware';

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

router.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkOwnership(userService, 'userId'),
  userController.getUser,
);

router.patch(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkOwnership(userService, 'userId'),
  userController.updateUser,
);

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.deleteUser,
);

export default router;
