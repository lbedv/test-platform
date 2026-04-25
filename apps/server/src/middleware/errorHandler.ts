// Global error handling middleware
// Catches and formats errors from all routes with appropriate HTTP status codes
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

// Custom error interface extending Error with optional statusCode
export interface AppError extends Error {
  statusCode?: number;
}

// Express error handler middleware
// Handles Zod validation errors and application errors with appropriate logging
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handle Zod validation errors (HTTP 400)
  if (err instanceof ZodError) {
    logger.warn("Validation failed (400):", err.issues);

    res.status(400).json({
      message: "Validation failed",
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  // Handle application errors with statusCode or default to 500
  const appErr = err as AppError;
  const status = appErr.statusCode ?? 500;
  const message = appErr.message ?? "Internal server error";

  // Log errors at appropriate level (error for 5xx, warn for 4xx)
  if (status >= 500) {
    logger.error(`[${status}] System error:`, err);
  } else {
    logger.warn(`[${status}] Client error:`, message);
  }

  res.status(status).json({ message });
}
