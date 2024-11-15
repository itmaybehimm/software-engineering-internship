// auth.service.ts

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../../interfaces/services/user/user-service.interface';
import { UserProfileResponseDto } from '../../dto/response/user/user.response';
import { AuthService } from '../../interfaces/services/auth/auth-service.interface';
import { User } from '../../entities/user.entity';

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
    const user: UserProfileResponseDto = await this.userService.validateUser({
      username,
      password,
    });

    const payload = { sub: user.id };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userService.updateUser(user, { refreshToken: hashedRefreshToken });

    return { accessToken, refreshToken };
  }

  // Refresh token logic (validate the refresh token and issue new ones)
  async refreshTokens(
    query: Partial<User>,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.validateRefreshToken({ id: query.id }, refreshToken);

    // Create new access and refresh tokens
    const newAccessToken = jwt.sign({ sub: query.id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const newRefreshToken = jwt.sign({ sub: query.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);

    await this.userService.updateUser(
      { username: user.username },
      { refreshToken: hashedRefreshToken },
    );

    return { accessToken: newAccessToken, refreshToken: hashedRefreshToken };
  }
}
