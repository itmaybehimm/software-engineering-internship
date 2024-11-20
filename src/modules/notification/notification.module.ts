import { eventBus } from '../../config/event-config';
import { NotificationFactory } from './notification.factory';

export class NotificationModule {
  private static notificationFactory: NotificationFactory = new NotificationFactory(eventBus);

  static initialize(): void {
    //just runs this entire file and makes sure it is refrenced
  }

  static getNotificationFactory(): NotificationFactory {
    if (!this.notificationFactory) {
      throw new Error('NotificationModule is not initialized yet.');
    }
    return this.notificationFactory;
  }
}

export const notificationFactory = NotificationModule.getNotificationFactory();
