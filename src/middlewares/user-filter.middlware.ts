import { NextFunction, Response } from 'express';
import { ROLE } from '../enums/user-role.enum';
import { BadRequestError } from '../errors/bad-request-error';
import { AuthenticatedRequest } from '../types/authenticated-request';

export const addUserFilterMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.user.id);

    if (req.user.role == ROLE.ADMIN) {
      req.userFilter = { userId: null };
    } else {
      req.userFilter = { userId: userId };
    }

    if (!userId) {
      throw new BadRequestError('User id invalid');
    }
  } catch (error) {
    next(error);
  }

  next();
};
