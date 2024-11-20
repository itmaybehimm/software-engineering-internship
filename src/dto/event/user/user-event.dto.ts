import { IsEmail, IsNotEmpty } from 'class-validator';

export class NotificationEventDto {
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  message: string;

  @IsEmail()
  email?: string;
}
