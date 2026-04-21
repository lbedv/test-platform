import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import { authRouter } from "./features/auth/auth.controller.js";
import { usersRouter } from "./features/users/user.controller.js";
import { attemptsRouter } from "./features/attempts/attempt.controller.js";
import { testRouter } from "./features/tests/test.controller.js";
import { logger } from "./utils/logger.js";
import { config } from "./config/env.js"

export const app: express.Application = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    config.cors_origin
  ],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, _res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/attempts", attemptsRouter);
app.use("/api/tests", testRouter);

app.use(errorHandler);
