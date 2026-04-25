// Express application setup and middleware configuration
// Configures CORS, parsers, request logging, routes, and error handling
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./features/auth/auth.controller.js";
import { usersRouter } from "./features/users/user.controller.js";
import { attemptsRouter } from "./features/attempts/attempt.controller.js";
import { testRouter } from "./features/tests/test.controller.js";
import { logger } from "./utils/logger.js";
import { config } from "./config/env.js";

export const app: express.Application = express();

// CORS middleware - allows requests from client app and configured origin
// credentials: true allows cookies to be sent across origins
app.use(cors({
  origin: [
    'http://localhost:5173',
    config.cors_origin
  ],
  credentials: true,
}));

// Body and cookie parsing middleware
app.use(express.json());
app.use(cookieParser());

// Request logging middleware for debugging and monitoring
app.use((req, _res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// API route handlers
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/attempts", attemptsRouter);
app.use("/api/tests", testRouter);

// Global error handling middleware - must be last
app.use(errorHandler);
