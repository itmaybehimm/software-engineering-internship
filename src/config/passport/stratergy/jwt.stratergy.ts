// jwt.strategy.ts

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';

import { userService } from '../../../service/user/user.service';

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_SECRET, // Your JWT secret key
  },
  async (payload: JwtPayload, done) => {
    try {
      const user = await userService.findOne({ id: parseInt(payload.sub) });

      done(null, user);
    } catch (error) {
      done(error, false); // If there's an error, return an error message
    }
  },
);
