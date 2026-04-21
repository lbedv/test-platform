import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import type { RegisterInput, UserStatsResponse } from "@test-platform/shared/schemas"
import { createError } from "../../utils/createError.js";
import { validateObjectId } from "../../utils/validateObjectId.js";

const SALT_ROUNDS = 10;

export async function createUser(input: RegisterInput) {
  const existing = await User.findOne({ email: input.email }).lean();
  if (existing) throw createError("Email already registered", 409);

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await User.create({
    email: input.email,
    passwordHash,
    firstName: input.firstName,
    lastName: input.lastName,
    role: "USER",
  });
  return user.toObject();
}

export async function findByEmail(email: string) {
  return User.findOne({ email }).lean();
}

export async function findById(id: string) {
  return User.findById(id).select("-passwordHash").lean();
}

export async function getProfile(userId: string) {
  const user = await User.findById(userId).select("-passwordHash").lean();
  if (!user) return null;
  return user;
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function changeProfileName(userId: string, firstName: string, lastName: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true } 
  ).select("-passwordHash").lean();

  if (!user) throw createError("User not found", 404);

  return user;
}

export async function getDashboardStats(userId: string): Promise<UserStatsResponse> {
  validateObjectId(userId, "user");

  const user = await User.findById(userId).select("stats").lean();
  if (!user) throw createError("User not found", 404);

  const averageScore = user.stats.totalTestsTaken > 0 
    ? Math.round(user.stats.totalScore / user.stats.totalTestsTaken)
    : 0;

  return {
    totalTestsTaken: user.stats.totalTestsTaken,
    averageScore,
    testsCreated: user.stats.testsCreated,
    recentActivity: user.stats.recentActivity,
  };
}


export async function changeUserPassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await User.findById(userId).lean();
  if (!user) throw createError("User not found", 404);

  const ok = await verifyPassword(currentPassword, user.passwordHash);
  if (!ok) throw createError("Incorrect current password", 401);

  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { passwordHash: newPasswordHash },
    { new: true } 
  ).select("-passwordHash").lean();

  return updatedUser;
}