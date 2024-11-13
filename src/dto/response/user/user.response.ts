import { ROLE } from '../../../enums/user-role.enum';
import { CustomExpose } from '../../../utils/decorators/class-transformer-custom/expose.decorator';

export class UserProfileResponseDto {
  @CustomExpose()
  id: number = -1;

  @CustomExpose()
  username: string = '';

  @CustomExpose()
  role: ROLE = ROLE.USER;
}
