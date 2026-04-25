// Utility to create standardized application errors with HTTP status codes
// Used throughout the app for consistent error handling
export const createError = (message: string, statusCode: number) => {
  const err = new Error(message) as Error & { statusCode: number };
  err.statusCode = statusCode;
  return err;
};