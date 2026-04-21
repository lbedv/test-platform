import "dotenv/config";

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? defaultValue!;
}

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
