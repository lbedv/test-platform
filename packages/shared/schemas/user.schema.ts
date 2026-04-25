// User profile and stats validation schemas
// Defines request/response formats for user management and dashboard data
import { z } from "zod"

/**
 * Validation schema for user profile update form.
 * Validates first and last name fields.
 */
export const ProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
})

export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>

/**
 * Validation schema for password change request.
 * Requires current password and new password (min 8 chars).
 */
export const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export type PasswordChange = z.infer<typeof PasswordChangeSchema>

/**
 * Client-side password change form with confirmation.
 * Validates that new password matches confirmation password.
 */
export const PasswordFormSchema = PasswordChangeSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type PasswordFormData = z.infer<typeof PasswordFormSchema>

// User statistics for dashboard display
// Aggregated metrics about user's testing activity
export const UserStatsResponseSchema = z.object({
  totalTestsTaken: z.number(),
  averageScore: z.number(),
  testsCreated: z.number(),
  recentActivity: z.string(),
});
export type UserStatsResponse = z.infer<typeof UserStatsResponseSchema>
