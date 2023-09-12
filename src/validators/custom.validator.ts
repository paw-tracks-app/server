import Joi from 'joi';

export const password: Joi.CustomValidator<string> = (value, helpers) => {
  if (value.length < 8 || !value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    throw new Error();
  }
  return value;
};
