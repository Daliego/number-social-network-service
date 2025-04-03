import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  MYSQL_DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform(Number)
    .refine((n) => n >= 1024 && n <= 65535, {
      message: "Port must be between 1024 and 65535",
    }),
  NODE_ENV: z.enum(["development", "production", "test"]),
  JWT_SECRET: z.string().min(32),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  JWT_EXPIRY: z.string().regex(/^\d+[smhd]$/),
  REFRESH_TOKEN_EXPIRY: z.string().regex(/^\d+[smhd]$/),
  FRONTEND_URL: z.string().url(),
  APP_NAME: process.env.NODE_ENV === "development" ? z.string().optional().default("Express Boilerplate") : z.string(),
  SERVER_URL: z.string().url(),
  PROMETHEUS_URL: z.string().url().optional().default('http://localhost:9090'),
});

export const ENV = envSchema.parse(process.env);