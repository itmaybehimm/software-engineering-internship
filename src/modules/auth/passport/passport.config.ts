import passport from 'passport';
import { localStrategy } from './stratergy/local.stratergy';
import { jwtStrategy } from './stratergy/jwt.stratergy';
import { jwtRefreshStrategy } from './stratergy/jwt-refresh.stratergy';

export const initializePassport = () => {
  passport.use('local', localStrategy);
  passport.use('jwt', jwtStrategy);
  passport.use('jwt-refresh', jwtRefreshStrategy);
};
