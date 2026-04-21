import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.js";
import { requireAuth, type AuthRequest } from "../../middleware/authGuard.js";
import * as userService from "./user.service.js";
import { AuthResponseSchema, ProfileUpdateSchema, PasswordChangeSchema } from "@test-platform/shared/schemas"
import { toAuthResponse } from "./user.mapper.js";

export const usersRouter: Router = Router();

usersRouter.use(requireAuth);

usersRouter.get("/me", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const user = await userService.getProfile(userId);
  if (!user) {
    res.status(404).json({ message: "User not found" });
      return;
    }

  const validatedResponse = AuthResponseSchema.parse(
    toAuthResponse(user)
  );
    res.json(validatedResponse);
  }
));

usersRouter.put("/me", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const body = ProfileUpdateSchema.parse(req.body);
  const updatedUser = await userService.changeProfileName(userId, body.firstName, body.lastName);
  res.json(toAuthResponse(updatedUser));
}));

usersRouter.put("/me/password", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const body = PasswordChangeSchema.parse(req.body);
  await userService.changeUserPassword(userId, body.currentPassword, body.newPassword);
  res.status(204).send();
}));

usersRouter.get("/me/stats", catchAsync(async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const stats = await userService.getDashboardStats(userId);
  res.status(200).json(stats);
}));