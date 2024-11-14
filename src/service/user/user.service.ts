import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { userRepository } from '../../repositories/user.repository';
import { RegisterRequestDto } from '../../dto/request/auth/register.dto';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../errors/bad-request-error';
import { LoginRequestDto } from '../../dto/request/auth/login.dto';
import { NotFoundError } from '../../errors/not-found-error';
import { UnauthorizedError } from '../../errors/unauthorized-error';
import { UserProfileResponseDto } from '../../dto/response/user/user.response';

import { customPlainToClass } from '../../utils/functions/transform';
import { UserService } from '../../interfaces/services/user/user-service.interface';

class UserServiceImpl implements UserService {
  private readonly userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserProfileResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => customPlainToClass(UserProfileResponseDto, user));
  }

  async register(userData: RegisterRequestDto): Promise<UserProfileResponseDto> {
    const { username, password } = userData;

    // Check if the username already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestError('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(newUser);
    return customPlainToClass(UserProfileResponseDto, user);
  }

  async findOne(user: Partial<User>): Promise<UserProfileResponseDto> {
    const existingUser = await this.userRepository.findOne({ where: user });
    if (!existingUser) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }
    return customPlainToClass(UserProfileResponseDto, existingUser);
  }

  async updateUser(user: Partial<User>, options: Partial<User>): Promise<UserProfileResponseDto> {
    const result = await this.userRepository.update(user, options);

    if (result.affected === 0) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }

    const updatedUser = await this.userRepository.findOne({ where: user });

    if (!updatedUser) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }

    return customPlainToClass(UserProfileResponseDto, updatedUser);
  }

  async validateUser(credentials: LoginRequestDto): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: { username: credentials.username } });

    if (!user) {
      throw new NotFoundError("User with the specified username doesn't exist");
    }

    const passwordMatch = bcrypt.compareSync(credentials.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    return customPlainToClass(UserProfileResponseDto, user);
  }

  async validateRefreshToken(
    query: Partial<User>,
    refreshToken: string,
  ): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOneOrFail({ where: query });

    if (!user) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }

    const refreshMatch = bcrypt.compareSync(refreshToken, user.refreshToken);

    if (!refreshMatch) {
      throw new UnauthorizedError('Please Relogin');
    }

    return customPlainToClass(UserProfileResponseDto, user);
  }
}

export const userService: UserService = new UserServiceImpl(userRepository);
