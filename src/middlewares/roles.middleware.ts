import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { RequestUser } from '../types/request-user';

export function checkRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as RequestUser;

    if (!user) {
      throw new UnauthorizedError('No User associated with request');
    }

    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenError('User not authorized to access this endpoint');
    }

    next();
  };
}
