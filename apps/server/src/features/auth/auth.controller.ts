import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import * as authService from "./auth.service.js";
import { LoginInputSchema, RegisterInputSchema } from "@test-platform/shared/schemas"

export const authRouter: Router = Router();

authRouter.post("/register", catchAsync(async (req, res) => {
  const body = RegisterInputSchema.parse(req.body);
  const { user, token } = await authService.register(body);
  
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days,
  });
  
  res.status(201).json(user);
}));

authRouter.post("/login", catchAsync( async (req, res) => {
  const body = LoginInputSchema.parse(req.body);
  const { user, token } = await authService.login(body);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json(user);
}));

authRouter.post("/logout", catchAsync(async (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  
  res.status(200).json({ message: "Logged out successfully" });
}));