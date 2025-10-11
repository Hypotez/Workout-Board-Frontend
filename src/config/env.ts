import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z.url('Not a valid URL').default('http://localhost:3000/api'),
  VITE_MODE: z
    .enum(['development', 'production'], 'MODE must be either "development" or "production"')
    .default('development'),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error('Invalid environment variables');
}

export default parsed.data;
