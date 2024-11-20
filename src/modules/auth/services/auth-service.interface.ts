import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { UserProfileResponseDto } from '../../../dto/response/user/user-response.dto';
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
  register(userData: RegisterRequestDto): Promise<UserProfileResponseDto>;
}
