import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import { UserProfileResponseDto } from '../../../dto/response/user/user-response.dto';
import { LoginRequestDto } from '../../../dto/request/auth/login.dto';
import { User } from '../../../entities/user.entity';
import { AuthenticatedRequest } from '../../../types/authenticated-request';

export interface UserService {
  getAllUsers(): Promise<UserProfileResponseDto[]>;
  findUserNonFiltered(userCriteria: Partial<User>): Promise<UserProfileResponseDto>;
  findUser(req: AuthenticatedRequest, userCriteria: Partial<User>): Promise<UserProfileResponseDto>;
  register(userData: RegisterRequestDto): Promise<UserProfileResponseDto>;
  validateCredentials(credentials: LoginRequestDto): Promise<UserProfileResponseDto>;
  updateUserDetailsNonFiltered(
    userCriteria: Partial<User>,
    updateOptions: Partial<User>,
  ): Promise<UserProfileResponseDto>;
  updateUserDetails(
    req: AuthenticatedRequest,
    userCriteria: Partial<User>,
    updateOptions: Partial<User>,
  ): Promise<UserProfileResponseDto>;
  validateRefreshToken(user: Partial<User>, refreshToken: string): Promise<UserProfileResponseDto>;
  deleteUsers(userCriteria: Partial<User>): Promise<number>;
  isOwner: (userId: number, resourceId: number) => Promise<boolean>;
}
