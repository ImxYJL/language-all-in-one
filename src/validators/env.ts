import { z } from 'zod';

const ServerEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  JWT_SECRET_KEY: z.string().min(1, 'JWT_SECRET_KEY is required'),
  REAL_USER_ID: z.string().min(1, 'REAL_USER_ID is required'),
  SUPABASE_URL: z.url('SUPABASE_URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
});

export const serverEnv = ServerEnvSchema.parse(process.env);
