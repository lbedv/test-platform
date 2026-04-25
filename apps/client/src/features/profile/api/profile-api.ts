import { apiFetch } from "@/shared/lib/api-client"
import { AuthResponseSchema, type ProfileUpdate, type PasswordChange} from "@test-platform/shared/schemas"

/**
 * Logs out the current user.
 * @returns Promise resolving to logout response
 */
export function postLogout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  })
}

/**
 * Updates the current user's profile information.
 * @param data - The profile update data
 * @returns Promise resolving to authentication response
 */
export function updateProfile(data: ProfileUpdate) {
  return apiFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}

/**
 * Changes the current user's password.
 * @param data - The password change data
 * @returns Promise resolving to void response
 */
export function changePassword(data: PasswordChange) {
  return apiFetch<void>("/users/me/password", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}