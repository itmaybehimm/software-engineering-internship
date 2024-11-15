import { UserService } from '../interfaces/services/user/user-service.interface';
import { UserServiceImpl } from '../service/user/user.service';
import { userRepository } from '../repositories/user.repository';
import { UserController } from '../interfaces/controllers/user/user-controller.interface';
import { UserControllerImpl } from '../controllers/user/user.controller';
import { AuthService } from '../interfaces/services/auth/auth-service.interface';
import { AuthServiceImpl } from '../service/auth/auth.service';

// Service Instances
export const userService: UserService = new UserServiceImpl(userRepository);
export const authService: AuthService = new AuthServiceImpl(userService);

// Controller Instances
export const userController: UserController = new UserControllerImpl(userService);
