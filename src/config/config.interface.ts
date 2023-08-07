import { z } from 'zod';

export const configValidationSchema = z
  .object({
    DATABASE_HOST: z.string(),
    DATABASE_PORT: z.string(),
    DATABASE_TESTING_PORT: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    STAGE: z.string().default('dev'),
    API_KEY: z.string().min(10).max(20),
  })
  .required();

export type configValidationType = z.infer<typeof configValidationSchema>;
