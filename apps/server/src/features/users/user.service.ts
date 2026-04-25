// User service - core business logic for user account management
// Handles password hashing, profile updates, authentication, and statistics
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import type { RegisterInput, UserStatsResponse } from "@test-platform/shared/schemas"
import { createError } from "../../utils/createError.js";
import { validateObjectId } from "../../utils/validateObjectId.js";

// Bcrypt salt rounds for password hashing security
const SALT_ROUNDS = 10;

// Create new user account - hashes password and stores in database
export async function createUser(input: RegisterInput) {
  const existing = await User.findOne({ email: input.email }).lean();
  if (existing) throw createError("Email already registered", 409);

  // Hash password before storing
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

// Find user by email (includes passwordHash for authentication)
export async function findByEmail(email: string) {
  return User.findOne({ email }).lean();
}

// Find user by ID (excludes password for security)
export async function findById(id: string) {
  return User.findById(id).select("-passwordHash").lean();
}

// Get user profile (excludes password)
export async function getProfile(userId: string) {
  const user = await User.findById(userId).select("-passwordHash").lean();
  if (!user) return null;
  return user;
}

// Compare plain text password with hashed password
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Update user's first and last name
export async function changeProfileName(userId: string, firstName: string, lastName: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName },
    { new: true, runValidators: true } 
  ).select("-passwordHash").lean();

  if (!user) throw createError("User not found", 404);

  return user;
}

// Retrieve user's aggregated test statistics for dashboard
export async function getDashboardStats(userId: string): Promise<UserStatsResponse> {
  validateObjectId(userId, "user");

  const user = await User.findById(userId).select("stats").lean();
  if (!user) throw createError("User not found", 404);

  // Calculate average score (0 if no tests taken)
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

// Change user password after verifying current password
export async function changeUserPassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await User.findById(userId).lean();
  if (!user) throw createError("User not found", 404);

  // Verify current password before allowing change
  const ok = await verifyPassword(currentPassword, user.passwordHash);
  if (!ok) throw createError("Incorrect current password", 401);

  // Hash new password before storing
  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { passwordHash: newPasswordHash },
    { new: true } 
  ).select("-passwordHash").lean();

  return updatedUser;
}