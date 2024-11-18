import { Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { ForbiddenError } from '../errors/forbidden-error';
import { BadRequestError } from '../errors/bad-request-error';
import { ROLE } from '../enums/user-role.enum';

type OwnershipService = {
  isOwner: (userId: number, resourceId: number) => Promise<boolean>;
};

export const checkOwnership =
  (service: OwnershipService, idField: string) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const userId = parseInt(req.user.id);
      const resourceId = parseInt(req.params[idField], 10);

      if (req.user.role === ROLE.ADMIN) {
        return next();
      }

      if (!userId) {
        throw new UnauthorizedError('User not authorized');
      }

      if (isNaN(resourceId)) {
        throw new BadRequestError(`Invalid ${idField}`);
      }

      const isOwner = await service.isOwner(userId, resourceId);
      if (!isOwner) {
        throw new ForbiddenError('This user cannot perform the action');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
