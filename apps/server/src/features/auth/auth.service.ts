// Authentication service - handles user registration and login logic
import { signToken } from "../../middleware/authGuard.js";
import * as userService from "../users/user.service.js";
import type { LoginInput, RegisterInput } from "@test-platform/shared/schemas"
import { toAuthResponse } from "../users/user.mapper.js";
import { createError } from "../../utils/createError.js";

// Register new user - creates user record and returns JWT token
export async function register(input: RegisterInput) {
  const user = await userService.createUser(input);
  // Build JWT payload with user identity and role
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

// Login user - validates credentials and returns JWT token
export async function login(input: LoginInput) {
  // Find user by email, return 401 if not found
  const user = await userService.findByEmail(input.email);
  if (!user) throw createError("Invalid email or password", 401);
  
  // Verify password hash, return 401 if password invalid
  const ok = await userService.verifyPassword(input.password, user.passwordHash);
  if (!ok) throw createError("Invalid email or password", 401);

  // Build JWT payload with user identity and role
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
