import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types/authenticated-request';

export interface UserController {
  getAllUsers(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  getUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
  deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
