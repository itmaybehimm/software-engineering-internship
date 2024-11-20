import { Router } from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/roles.middleware';
import { ROLE } from '../enums/user-role.enum';
// import { userController } from '../modules/user/user.module';
import { addUserFilterMiddleware } from '../middlewares/user-filter.middlware';
import { userController } from '../modules/user/user.module';

export const userRouter = Router();

userRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.getAllUsers,
);

userRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.getAllUsers,
);

userRouter.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  addUserFilterMiddleware,
  userController.getUser,
);

userRouter.patch(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  addUserFilterMiddleware,
  userController.updateUser,
);

userRouter.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.deleteUser,
);
