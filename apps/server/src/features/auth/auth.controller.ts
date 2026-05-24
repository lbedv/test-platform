// Authentication routes - handles user registration, login, and logout
import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import * as authService from "./auth.service.js";
import { LoginInputSchema, RegisterInputSchema } from "@test-platform/shared/schemas"

export const authRouter: Router = Router();

function getCookieOptions(req: { hostname: string }) {
  const isLocalhost = req.hostname === "localhost" || req.hostname === "127.0.0.1";

  return {
    httpOnly: true,
    sameSite: "none" as const,
    secure: process.env.NODE_ENV === "production" || isLocalhost,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
}

// POST /api/auth/register - Create new user account
// Validates input, creates user, generates JWT token, sets httpOnly cookie
authRouter.post("/register", catchAsync(async (req, res) => {
  const body = RegisterInputSchema.parse(req.body);
  const { user, token } = await authService.register(body);
  
  // Set JWT in httpOnly cookie for automatic inclusion in requests
  res.cookie("token", token, getCookieOptions(req));
  
  res.status(201).json(user);
}));

// POST /api/auth/login - Authenticate user with email and password
// Validates credentials, generates JWT token, sets httpOnly cookie
authRouter.post("/login", catchAsync( async (req, res) => {
  const body = LoginInputSchema.parse(req.body);
  const { user, token } = await authService.login(body);
  res.cookie("token", token, getCookieOptions(req));

  res.json(user);
}));

authRouter.post("/logout", catchAsync(async (req, res) => {
  res.clearCookie("token", {
    ...getCookieOptions(req),
    maxAge: undefined,
  });
  
  res.status(200).json({ message: "Logged out successfully" });
}));