import { AuthModule } from './modules/auth/auth.module';
import { NotificationModule } from './modules/notification/notification.module';
import { UserModule } from './modules/user/user.module';

console.log('-----------app.module.ts loaded-----------');
export const initalizeModules = () => {
  UserModule.initialize();
  AuthModule.initialize();
  NotificationModule.initialize();
  console.log('-----------All modules initalized-----------');
};
