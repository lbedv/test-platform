import { apiFetch } from "@/lib/api-client"

export interface UserProfile {
  fullName: string
  email: string
  registeredAt: string
}

export function getProfile() {
  return apiFetch<UserProfile>("/users/me")
}

export function updateProfile(data: { fullName: string; email: string }) {
  return apiFetch<UserProfile>("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  })
}

export function changePassword(currentPassword: string, newPassword: string) {
  return apiFetch<void>("/users/me/password", {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
  })
}
