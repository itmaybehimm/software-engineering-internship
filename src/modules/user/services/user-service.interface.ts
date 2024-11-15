import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { UserProfileResponseDto } from '../../../dto/response/user/user.response';
import { LoginRequestDto } from '../../../dto/request/auth/login.dto';
import { User } from '../../../entities/user.entity';

export interface UserService {
  getAllUsers(): Promise<UserProfileResponseDto[]>;
  findUser(userCriteria: Partial<User>): Promise<UserProfileResponseDto>;
  register(userData: RegisterRequestDto): Promise<UserProfileResponseDto>;
  validateCredentials(credentials: LoginRequestDto): Promise<UserProfileResponseDto>;
  updateUserDetails(
    userCriteria: Partial<User>,
    updateOptions: Partial<User>,
  ): Promise<UserProfileResponseDto>;
  validateRefreshToken(user: Partial<User>, refreshToken: string): Promise<UserProfileResponseDto>;
  deleteUsers(userCriteria: Partial<User>): Promise<number>;
}
