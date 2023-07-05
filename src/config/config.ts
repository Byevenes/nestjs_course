import { z } from 'zod';
import { configValidationSchema } from './config.interface';

export type Config = z.infer<typeof configValidationSchema>;

export const config = (config: Record<string, unknown>) => {
  const result = configValidationSchema.parse(config);
  return result;
};
