import { userService } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth-service.interface';
import { AuthServiceImpl } from './services/auth.service';

export class AuthModule {
  private static authService: AuthService = new AuthServiceImpl(userService) as AuthService;
  private static authController: AuthController = new AuthController(
    this.authService,
  ) as AuthController;

  static initialize(): void {
    //just runs this entire file and makes sure it is refrenced
  }

  static getAuthService(): AuthService {
    if (!this.authService) {
      throw new Error('AuthModule is not initialized yet.');
    }
    return this.authService;
  }

  static getAuthController(): AuthController {
    if (!this.authController) {
      throw new Error('AuthModule is not initialized yet.');
    }
    return this.authController;
  }
}

export const authController = AuthModule.getAuthController();
export const authService = AuthModule.getAuthService();
