import { NotificationService } from './services/notification-service.interface';
import { EmailService } from './services/email.service';

export class NotificationFactory {
  private emailService: EmailService;

  constructor(eventBus) {
    this.emailService = new EmailService(eventBus);
  }

  getNotificationService(type: string): NotificationService {
    switch (type) {
      case 'email':
        return this.emailService;
      default:
        throw new Error(`Notification service of type ${type} is not supported.`);
    }
  }
}
