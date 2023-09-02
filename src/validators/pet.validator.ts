import Joi from 'joi';

const create = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1).max(24),
  }),
};

export default {
  create,
};
