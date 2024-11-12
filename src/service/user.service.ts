import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { userRepository } from '../repositories/user.repository';
import { RegisterRequestDto } from '../dto/register.dto';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async register(userData: RegisterRequestDto): Promise<User> {
    const { username, password } = userData;

    // Check if the username already exists
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}
