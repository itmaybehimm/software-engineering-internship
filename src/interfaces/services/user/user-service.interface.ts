import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { UserProfileResponseDto } from '../../../dto/response/user/user.response';
import { LoginRequestDto } from '../../../dto/request/auth/login.dto';
import { User } from '../../../entities/user.entity';

export interface UserService {
  getAllUsers(): Promise<UserProfileResponseDto[]>;
  register(userData: RegisterRequestDto): Promise<UserProfileResponseDto>;
  findOne(user: Partial<User>): Promise<UserProfileResponseDto>;
  validateUser(credentials: LoginRequestDto): Promise<UserProfileResponseDto>;
  updateUser(user: Partial<User>, options: Partial<User>): Promise<UserProfileResponseDto>;
  validateRefreshToken(user: Partial<User>, refreshToken: string): Promise<UserProfileResponseDto>;
}
