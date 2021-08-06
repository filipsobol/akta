import Joi from 'joi';
import { Configuration } from '@akta/app';

const serverSchema = {
  port: Joi.number().integer().min(1023).max(65535).required()
};

const buildSchema = {
  outDir: Joi.string().trim()
};

const configSchema = Joi.object({
  title: Joi.string().required(),
  server: Joi.object(serverSchema).required(),
  routes: Joi.array().required(),
  build: Joi.object(buildSchema)
});

export function validateConfig(configuration: Configuration) {
  const { error, value } = configSchema.validate(configuration);

  if (error) {
    throw new Error(error.annotate());
  }

  return value;
}
