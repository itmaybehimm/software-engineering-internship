import { Request } from 'express';
import { RequestUser } from './request-user'; // Import your custom user type

type UserFilter = {
  userId: number;
};
export interface AuthenticatedRequest extends Request {
  user: RequestUser;
  userFilter?: UserFilter;
}
