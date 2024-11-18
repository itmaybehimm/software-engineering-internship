import { Repository } from 'typeorm';
import { User } from '../../../entities/user.entity';

import { RegisterRequestDto } from '../../../dto/request/auth/register.dto';
import bcrypt from 'bcrypt';
import { BadRequestError } from '../../../errors/bad-request-error';
import { LoginRequestDto } from '../../../dto/request/auth/login.dto';
import { NotFoundError } from '../../../errors/not-found-error';
import { UnauthorizedError } from '../../../errors/unauthorized-error';
import { UserProfileResponseDto } from '../../../dto/response/user/user-response.dto';

import { UserService } from './user-service.interface';
import { plainToClass } from 'class-transformer';

export class UserServiceImpl implements UserService {
  private readonly userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<UserProfileResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) =>
      plainToClass(UserProfileResponseDto, user, { excludeExtraneousValues: true }),
    );
  }

  async findUser(userCriteria: Partial<User>): Promise<UserProfileResponseDto> {
    const user = await this.userRepository.findOne({ where: userCriteria });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return plainToClass(UserProfileResponseDto, user, { excludeExtraneousValues: true });
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
    return plainToClass(UserProfileResponseDto, user, { excludeExtraneousValues: true });
  }

  async validateCredentials(credentials: LoginRequestDto): Promise<UserProfileResponseDto> {
    const userPassword = await this.userRepository.findOne({
      where: { username: credentials.username },
      select: ['password'],
    });

    if (!userPassword) {
      throw new NotFoundError("User with the specified username doesn't exist");
    }

    const passwordMatch = bcrypt.compareSync(credentials.password, userPassword.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const user = await this.userRepository.findOne({ where: { username: credentials.username } });

    return plainToClass(UserProfileResponseDto, user, { excludeExtraneousValues: true });
  }

  async updateUserDetails(
    userCriteria: Partial<User>,
    updateOptions: Partial<User>,
  ): Promise<UserProfileResponseDto> {
    const existingUser = await this.userRepository.findOne({ where: userCriteria });
    if (!existingUser) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }

    const updatedUser = this.userRepository.merge(existingUser, updateOptions);

    await this.userRepository.save(updatedUser);

    return plainToClass(UserProfileResponseDto, updatedUser, { excludeExtraneousValues: true });
  }

  async validateRefreshToken(
    query: Partial<User>,
    refreshToken: string,
  ): Promise<UserProfileResponseDto> {
    const userRefreshToken = await this.userRepository.findOneOrFail({
      where: query,
      select: ['refreshToken'],
    });

    if (!userRefreshToken) {
      throw new NotFoundError("User with specified criteria doesn't exist");
    }

    const refreshMatch = bcrypt.compareSync(refreshToken, userRefreshToken.refreshToken);

    if (!refreshMatch) {
      throw new UnauthorizedError('Please Relogin');
    }

    const user = await this.userRepository.findOne({ where: query });

    return plainToClass(UserProfileResponseDto, user, { excludeExtraneousValues: true });
  }

  async deleteUsers(userCriteria: Partial<User>): Promise<number> {
    const deleteResult = await this.userRepository.delete(userCriteria);

    if (!deleteResult.affected || deleteResult.affected === 0) {
      throw new NotFoundError('User Not Found');
    }

    return deleteResult.affected;
  }

  async isOwner(userId: number, resourceId: number): Promise<boolean> {
    return userId === resourceId;
  }
}
