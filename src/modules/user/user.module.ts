import { eventBus } from '../../config/event-config';
import { UserController } from './controller/user-controller.interface';
import { UserControllerImpl } from './controller/user.controller';
import { userRepository } from './repositories/user.repository';
import { UserService } from './services/user-service.interface';
import { UserServiceImpl } from './services/user.service';

export const userService = new UserServiceImpl(userRepository, eventBus) as UserService;

export const userController = new UserControllerImpl(userService) as UserController;
