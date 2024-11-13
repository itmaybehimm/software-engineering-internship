import { Exclude, Expose } from 'class-transformer';
import { ROLE } from '../../../enums/user-role.enum';

export class UserProfileResponseDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  role: ROLE;

  @Exclude()
  password: string;
}
