// Authentication validation schemas
// Defines request/response formats for login, registration, and auth responses
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
 * Validation schema for registration form input (server-side).
 * Requires valid email, password (min 8 chars), and name fields.
 */
export const RegisterInputSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterInput = z.infer<typeof RegisterInputSchema>

/**
 * Validation schema for client-side registration form.
 * Extends RegisterInputSchema with password confirmation field.
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
