import { apiFetch } from "@/lib/api-client"
import type { Attempt } from "../types"

export interface DashboardStatDTO {
  key: string
  title: string
  value: string
  description: string
}

export interface UserProfileDTO {
  fullName: string
  email: string
  registeredAt: string
}

export function getDashboardStats() {
  return apiFetch<DashboardStatDTO[]>("/dashboard/stats")
}

export function getRecentAttempts() {
  return apiFetch<Attempt[]>("/dashboard/attempts")
}

export function getUserProfile() {
  return apiFetch<UserProfileDTO>("/users/me")
}
