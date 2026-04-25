// Async error handling wrapper for Express route handlers
// Automatically catches promise rejections and passes them to error middleware
import { RequestHandler } from "express";

// Wraps async route handlers to catch errors without explicit try-catch
export const catchAsync = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    // Convert promise rejection into express error handling
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};