import { signToken } from "../../middleware/authGuard.js";
import * as userService from "../users/user.service.js";
import type { LoginInput, RegisterInput } from "@test-platform/shared/schemas"
import { toAuthResponse } from "../users/user.mapper.js";
import { createError } from "../../utils/createError.js";


export async function register(input: RegisterInput) {
  const user = await userService.createUser(input);
  const payload = {
    userId: String(user._id),
    email: user.email,
    role: user.role as "USER" | "ADMIN",
  };
  const token = signToken(payload);
  return {
    user: toAuthResponse(user),
    token,
  };
}

export async function login(input: LoginInput) {
  const user = await userService.findByEmail(input.email);
  if (!user) throw createError("Invalid email or password", 401);
  
  const ok = await userService.verifyPassword(input.password, user.passwordHash);
  if (!ok) throw createError("Invalid email or password", 401);

  const payload = {
    userId: String(user._id),
    email: user.email,
    role: user.role as "USER" | "ADMIN",
  };
  const token = signToken(payload);
  return {
    user: toAuthResponse(user),
    token,
  };
}
