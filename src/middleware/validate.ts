import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import pick from '../utils/pick';
import { BadRequestError } from '../config/errors';

const validate =
  (schema: object) =>
  (
    req: Request<any, any, any, any, any>,
    _res: Response,
    next: NextFunction,
  ) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const obj = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(obj);
    if (error) {
      const errorMessage = error.details
        .map(details => details.message)
        .join(', ');
      return next(new BadRequestError(errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
