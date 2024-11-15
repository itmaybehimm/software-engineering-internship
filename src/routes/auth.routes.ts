import { Router } from 'express';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  res.cookie('accessToken', req.user['access'], {
    httpOnly: true,
    maxAge: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.cookie('refreshToken', req.user['refresh'], {
    httpOnly: true,
    maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Login Successful' });
});

authRouter.post(
  '/refresh-token',
  passport.authenticate('jwt-refresh', { session: false }),
  async (req, res) => {
    res.cookie('accessToken', req.user['accessToken'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('refreshToken', req.user['refreshToken'], {
      httpOnly: true,
      maxAge: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.json({ message: 'Tokens Refreshed Successfully' });
  },
);
