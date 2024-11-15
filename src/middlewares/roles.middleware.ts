import { Response, NextFunction } from 'express';

import { ForbiddenError } from '../errors/forbidden-error';

import { AuthenticatedRequest } from '../types/authenticated-request';

export function checkRoles(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError('User not authorized to access this endpoint');
    }

    next();
  };
}
