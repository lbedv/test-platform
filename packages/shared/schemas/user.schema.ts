import { z } from "zod"

/**
 * Validation schema for user profile update form.
 * Validates display name and email address.
 */
export const ProfileUpdateSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
})

export type ProfileUpdate = z.infer<typeof ProfileUpdateSchema>

/**
 * Validation schema for changing user password.
 * Requires current password and confirms new password matches confirmation.
 */

export const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
})

export type PasswordChange = z.infer<typeof PasswordChangeSchema>

export const PasswordFormSchema = PasswordChangeSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type PasswordFormData = z.infer<typeof PasswordFormSchema>

export const UserStatsResponseSchema = z.object({
  totalTestsTaken: z.number(),
  averageScore: z.number(),
  testsCreated: z.number(),
  recentActivity: z.string(),
});
export type UserStatsResponse = z.infer<typeof UserStatsResponseSchema>
