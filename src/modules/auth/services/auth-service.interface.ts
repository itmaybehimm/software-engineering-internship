import { User } from '../../../entities/user.entity';

export interface AuthService {
  validateUserAndGenerateTokens(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshTokens(
    query: Partial<User>,
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
