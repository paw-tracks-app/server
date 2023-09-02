import { Request, RequestHandler, Response } from 'express';
import { AuthUser } from '../services/user.service';
import { generateToken } from '../config/passport';
import { omit } from 'lodash';

declare global {
  namespace Express {
    export interface User extends AuthUser {
      isExpired: boolean;
    }
    export interface Response {
      ok: OkFn;
    }
  }
}

type OkFn = <T>(data: T, _token?: string) => void | Promise<void>;

export const requestHandler =
  (fn: RequestHandler): RequestHandler =>
  (req: Request, res: Response, next) => {
    res.ok = data => {
      let token: string | undefined;
      if (req.user?.isExpired) {
        token = generateToken(omit(req.user, ['isExpired']));
      }
      res.json({
        data,
        ...(token && { token }),
      });
    };
    Promise.resolve(fn(req, res, next)).catch(next);
  };
