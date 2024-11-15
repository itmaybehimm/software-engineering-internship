import { Strategy as JwtStrategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { userService } from '../../../user/user.module';

const cookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.accessToken;
  }
  return null;
};

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_ACCESS_SECRET,
  },
  async (payload: JwtPayload, done) => {
    try {
      const user = await userService.findUser({ id: parseInt(payload.sub) });

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  },
);
