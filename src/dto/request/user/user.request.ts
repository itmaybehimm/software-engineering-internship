import { IsOptional, IsString } from 'class-validator';

import { Expose } from 'class-transformer';

export class UserUpdateRequestBodyDto {
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @Expose()
  username: string;
}
