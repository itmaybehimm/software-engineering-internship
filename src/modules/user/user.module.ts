// src/modules/user/user.module.ts
import { eventBus } from '../../config/event-config';
import { UserController } from './controller/user-controller.interface';
import { UserControllerImpl } from './controller/user.controller';
import { userRepository } from './repositories/user.repository';
import { UserService } from './services/user-service.interface';
import { UserServiceImpl } from './services/user.service';

export class UserModule {
  private static userService: UserService = new UserServiceImpl(
    userRepository,
    eventBus,
  ) as UserService;
  private static userController: UserController = new UserControllerImpl(
    this.userService,
  ) as UserController;

  static initialize(): void {
    //just runs this entire file and makes sure it is refrenced
  }

  static getUserService(): UserService {
    if (!this.userService) {
      throw new Error('UserModule is not initialized yet.');
    }
    return this.userService;
  }

  static getUserController(): UserController {
    if (!this.userController) {
      throw new Error('UserModule is not initialized yet.');
    }
    return this.userController;
  }
}

export const userController = UserModule.getUserController();
export const userService = UserModule.getUserService();
