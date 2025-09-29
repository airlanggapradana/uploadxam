import {z} from 'zod';

export const envSchema = z.object({
  PORT: z.string()
})

export const env = envSchema.parse(process.env);