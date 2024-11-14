import { Request, Response, NextFunction } from 'express';

export interface UserController {
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
}
