// Configuration management for environment variables
// Ensures all required variables are present and provides safe access with optional defaults
import "dotenv/config";

// Helper function to retrieve environment variables with optional defaults
// Throws error if required variable is missing
function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? defaultValue!;
}

// Centralized configuration object
// All config is readonly (as const) to prevent accidental mutations
export const config = {
  port: parseInt(getEnv("PORT", "3000"), 10),
  nodeEnv: getEnv("NODE_ENV", "development"),
  mongodb: {
    uri: getEnv("MONGODB_URI"),
  },
  jwt: {
    secret: getEnv("JWT_SECRET"),
  },
  cors_origin: getEnv("CORS_ORIGIN"),
} as const;
