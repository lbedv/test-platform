import { apiFetch } from "@/shared/lib/api-client"
import { AuthResponseSchema, type ProfileUpdate, type PasswordChange} from "@test-platform/shared/schemas"

export function postLogout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  })
}

export function updateProfile(data: ProfileUpdate) {
  return apiFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}

export function changePassword(data: PasswordChange) {
  return apiFetch<void>("/users/me/password", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}