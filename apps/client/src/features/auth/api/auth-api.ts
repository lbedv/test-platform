import { apiFetch } from "@/shared/lib/api-client"
import { AuthResponseSchema, type LoginInput, type RegisterInput } from "@test-platform/shared/schemas"

/**
 * Logs in a user with the provided credentials.
 * @param data - The login input containing email and password
 * @returns Promise resolving to authentication response
 */
export function postLogin(data: LoginInput) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}

/**
 * Registers a new user with the provided information.
 * @param data - The registration input containing user details
 * @returns Promise resolving to authentication response
 */
export function postRegister(data: RegisterInput) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}