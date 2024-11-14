export interface AuthService {
  validateUserAndGenerateTokens(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
  refreshTokens(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}
