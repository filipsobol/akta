import Joi from 'joi';
import { Configuration } from '@akta/app';

const configSchema = Joi.object({
  App: Joi.required(),
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
