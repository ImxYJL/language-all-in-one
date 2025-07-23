import { z } from 'zod';
import { LOGIN } from '@/constants/auth';

export const LoginSchema = z.object({
  username: z.string().min(LOGIN.username.min),
  password: z.string().min(LOGIN.password.min).max(LOGIN.password.max),
});
