import { z } from "zod";

/**
 * Validation schema for login form.
 * Requires valid email and non-empty password.
 */
export const LoginInputSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof LoginInputSchema>

/**
 * Validation schema for registration form input.
 * Requires valid email, password, and name fields.
 */
export const RegisterInputSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>

/**
 * Validation schema for registration form.
 * Enforces password requirements and matching confirmation password.
 */
export const RegisterFormSchema = RegisterInputSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

/**
 * Schema for successful authentication response.
 * Contains user details returned after login or registration.
 */
export const AuthResponseSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.string(),
});

export type AuthSuccessResponse = z.infer<typeof AuthResponseSchema>;
