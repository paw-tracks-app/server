import Joi from 'joi';
import { password } from './custom.validator';

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(1).max(24),
    lastName: Joi.string().required().min(5).max(24),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .custom(password)
      .message('Password must be ay least 8 characters and contain a number'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

export default {
  register,
  login,
};
