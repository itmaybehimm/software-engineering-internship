import { Strategy as JwtStrategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { authService } from '../../../containers/container';
import { Request } from 'express';

const refreshCookieExtractor = (req) => {
  if (req && req.cookies) {
    return req.cookies.refreshToken;
  }
  return null;
};

export const jwtRefreshStrategy = new JwtStrategy(
  {
    jwtFromRequest: refreshCookieExtractor,
    secretOrKey: process.env.JWT_REFRESH_SECRET,
    passReqToCallback: true,
  },
  async (req: Request, payload: JwtPayload, done) => {
    try {
      const userId = parseInt(payload.sub);
      const reqRefreshToken = refreshCookieExtractor(req);

      const { accessToken, refreshToken } = await authService.refreshTokens(
        { id: userId },
        reqRefreshToken,
      );

      return done(null, { accessToken, refreshToken });
    } catch (error) {
      return done(error, false);
    }
  },
);
