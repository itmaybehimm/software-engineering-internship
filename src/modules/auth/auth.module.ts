import { userService } from '../user/user.module';
import { AuthService } from './services/auth-service.interface';
import { AuthServiceImpl } from './services/auth.service';

export const authService = new AuthServiceImpl(userService) as AuthService;
