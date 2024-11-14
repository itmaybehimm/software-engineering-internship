import passport from 'passport';
import { localStrategy } from './stratergy/local.stratergy';
import { jwtStrategy } from './stratergy/jwt.stratergy';

export const initializePassport = () => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
