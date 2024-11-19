import { eventBus } from '../../config/event-config';
import { EmailService } from './services/email.service';
import { NotificationService } from './services/notification-service.interface';

export const emailService: NotificationService = new EmailService(eventBus);
