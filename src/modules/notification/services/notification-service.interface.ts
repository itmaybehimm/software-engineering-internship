import { NotificationEventDto } from '../../../dto/event/user/user-event.dto';

export interface NotificationService {
  sendAsync(notificationMessage: NotificationEventDto): Promise<void>;
}
