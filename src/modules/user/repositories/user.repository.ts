import { dataSource } from '../../../config/database/database.config';
import { User } from '../../../entities/user.entity';

export const userRepository = dataSource.getRepository(User);
