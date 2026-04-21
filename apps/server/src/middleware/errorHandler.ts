import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger.js";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ZodError) {
    logger.warn("Validation failed (400):", err.issues);

    res.status(400).json({
      message: "Validation failed",
      errors: err.flatten().fieldErrors,
    });
    return;
  }

  const appErr = err as AppError;
  const status = appErr.statusCode ?? 500;
  const message = appErr.message ?? "Internal server error";

  if (status >= 500) {
    logger.error(`[${status}] System error:`, err);
  } else {
    logger.warn(`[${status}] Client error:`, message);
  }

  res.status(status).json({ message });
}
