import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user-service.interface';
import { UserProfileResponseDto } from '../../../dto/response/user/user-response.dto';
import { AuthService } from './auth-service.interface';
import { User } from '../../../entities/user.entity';
import { config } from '../../../config/config';
import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';

export class AuthServiceImpl implements AuthService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  // Validate user and generate tokens
  async validateUserAndGenerateTokens(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user: UserProfileResponseDto = await this.userService.validateCredentials({
      username,
      password,
    });

    const payload = { sub: user.id };

    const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userService.updateUserDetailsNonFiltered(user, { refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  // Refresh token logic (validate the refresh token and issue new ones)
  async refreshTokens(
    query: Partial<User>,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.validateRefreshToken({ id: query.id }, refreshToken);

    // Create new access and refresh tokens
    const newAccessToken = jwt.sign({ sub: query.id }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    const newRefreshToken = jwt.sign({ sub: query.id }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

    await this.userService.updateUserDetailsNonFiltered(
      { username: user.username },
      { refreshToken: hashedRefreshToken },
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async register(userData: RegisterRequestDto): Promise<UserProfileResponseDto> {
    const data = await this.userService.register(userData);
    return data;
  }
}
