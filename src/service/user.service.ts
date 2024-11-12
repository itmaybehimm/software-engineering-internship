import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { userRepository } from '../repositories/user.repository';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = userRepository;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
