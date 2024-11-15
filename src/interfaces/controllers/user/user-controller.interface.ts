import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../../types/authenticated-request';

export interface UserController {
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllUsers(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
}
