import { config } from '../../../config/config';
import { NotificationService } from './notification-service.interface';
import nodemailer from 'nodemailer';

export class EmailService implements NotificationService {
  private transporter;
  private eventBus;

  constructor(eventBus) {
    // Configure the email transporter (e.g., using Nodemailer)
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

    this.eventBus.on('userUpdated', (userId: number) => {
      this.sendAsync(userId);
    });
  }

  async sendAsync(userId: number): Promise<void> {
    try {
      // Send the email
      const mailOptions = {
        from: config.email.gmailUsername,
        to: '077bct030.himanshu@pcampus.edu.np',
        subject: 'Notification',
        text: `user changed by- ${userId}`,
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to himansupradhan472@gmail.com`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
