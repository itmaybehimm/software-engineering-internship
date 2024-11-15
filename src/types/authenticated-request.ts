import { Request } from 'express';
import { RequestUser } from './request-user'; // Import your custom user type

export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}
