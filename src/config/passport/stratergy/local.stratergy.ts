import { Strategy as LocalStrategy } from 'passport-local';
import { authService } from '../../../modules/auth/auth.module';

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, done) => {
    try {
      const { accessToken, refreshToken } = await authService.validateUserAndGenerateTokens(
        username,
        password,
      );
      done(null, { access: accessToken, refresh: refreshToken });
    } catch (error) {
      done(error);
    }
  },
);
