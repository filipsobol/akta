import Joi from 'joi';
import { Configuration } from '@akta/app';

const serverSchema = {
  port: Joi.number().integer().min(1023).max(65535).required()
};

const configSchema = Joi.object({
  App: Joi.required(),
  server: Joi.object(serverSchema).required(),
  routes: Joi.array().required(),
  head: Joi.object()
});

export function validateConfig(configuration: Configuration) {
  const { error, value } = configSchema.validate(configuration);

  if (error) {
    throw new Error(error.annotate());
  }

  return value;
}
