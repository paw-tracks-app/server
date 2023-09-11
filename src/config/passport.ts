import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { decode, sign, verify } from 'jsonwebtoken';

import env from './env';
import { UnauthorizedError } from './errors';
import { AuthUser } from '../services/user.service';

type PassportUser = AuthUser & { exp: number; iat: number };

export const generateToken = (user: AuthUser) =>
  sign(user, env.jwtSecret, { expiresIn: '4h' });

passport.use(
  new BearerStrategy(async (token, cb) => {
    try {
      const { exp, iat, ...user } = verify(token, env.jwtSecret) as PassportUser;

      const isExpired = new Date(exp * 1000).valueOf() < Date.now() + 300000; // expire 5 minutes early to regenerate token

      cb(null, { ...user, isExpired });
    } catch (error) {
      cb(new UnauthorizedError((error as Error).message));
    }
  }),
);

passport.serializeUser(async (user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (user: any, cb) => {
  cb(null, user);
});
