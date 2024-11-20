import { config } from '../../../config/config';
import { NotificationEventDto } from '../../../dto/event/user/user-event.dto';
import { NotificationService } from './notification-service.interface';
import nodemailer from 'nodemailer';

export class EmailService implements NotificationService {
  private transporter;
  private eventBus;

  constructor(eventBus) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email.gmailUsername,
        pass: config.email.gmailPassword,
      },
    });

    this.eventBus = eventBus;

    this.eventBus.on('sendNotification', (notificationEventDto: NotificationEventDto) => {
      this.sendAsync(notificationEventDto);
    });
  }

  async sendAsync(notificationEventDto: NotificationEventDto): Promise<void> {
    try {
      // Send the email
      if (!notificationEventDto.email) {
        throw new Error('No email provided');
      }

      const mailOptions = {
        from: config.email.gmailUsername,
        to: notificationEventDto.email,
        subject: notificationEventDto.subject,
        text: notificationEventDto.message,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
