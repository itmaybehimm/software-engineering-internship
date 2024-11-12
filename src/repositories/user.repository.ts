import { dataSource } from '../config/database';
import { User } from '../entities/user.entity';

export const userRepository = dataSource.getRepository(User);
