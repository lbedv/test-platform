import { apiFetch } from "@/lib/api-client"

export interface AuthResponse {
  token: string
  user: { id: string; fullName: string; email: string }
}

export function postLogin(email: string, password: string) {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export function postRegister(
  fullName: string,
  email: string,
  password: string,
) {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ fullName, email, password }),
  })
}
