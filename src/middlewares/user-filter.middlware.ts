import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { BadRequestError } from '../errors/bad-request-error';
import { ROLE } from '../enums/user-role.enum';

export const addUserFilterMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.user.id);

    if (req.user.role == ROLE.ADMIN) {
      req.userFilter = { userId: null };
      next();
    }

    if (!userId) {
      throw new BadRequestError('User id invalid');
    }
    req.userFilter = { userId: userId };
  } catch (error) {
    next(error);
  }
  next();
};
