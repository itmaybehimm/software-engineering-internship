import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Expose, Transform } from 'class-transformer';

export class UserUpdateRequestBodyDto {
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @Expose()
  username: string;
}

export class UserUpdateRequestParamDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'userId must be a number' })
  @Expose()
  userId: number;
}

export class UserRetriveRequestParamDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'userId must be a number' })
  @Expose()
  userId: number;
}

export class UserDeleteRequestParamDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber({}, { message: 'userId must be a number' })
  @Expose()
  userId: number;
}
