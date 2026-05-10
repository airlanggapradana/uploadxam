import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string(),
  SECRET: z.string(),
  GEMINI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
