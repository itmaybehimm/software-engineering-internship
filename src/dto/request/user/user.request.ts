import { IsOptional, IsString } from 'class-validator';
import { CustomExpose } from '../../../utils/decorators/class-transformer-custom/expose.decorator';

export class UserUpdateRequestBodyDto {
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  @CustomExpose()
  username: string;
}
