export interface NotificationService {
  sendAsync(userId: number): Promise<void>;
}
