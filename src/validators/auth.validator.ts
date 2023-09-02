import Joi from 'joi';
import { password } from './custom.validator';

const register = {
  body: Joi.object().keys({
    firstName: Joi.string().required().min(5).max(24),
    lastName: Joi.string().required().min(5).max(24),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
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
