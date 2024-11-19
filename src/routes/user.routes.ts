import { Router } from 'express';
import passport from 'passport';
import { checkRoles } from '../middlewares/roles.middleware';
import { ROLE } from '../enums/user-role.enum';
import { userController } from '../modules/user/user.module';
import { addUserFilterMiddleware } from '../middlewares/user-filter.middlware';
import { emailService } from '../modules/notification/notification.module';

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
  addUserFilterMiddleware,
  userController.getUser,
);

router.patch(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  addUserFilterMiddleware,
  userController.updateUser,
);

router.delete(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  checkRoles([ROLE.ADMIN]),
  userController.deleteUser,
);

router.delete('/', (req, res, next) => {
  emailService.sendAsync(3);
  next();
});

export default router;
