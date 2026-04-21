import { apiFetch } from "@/shared/lib/api-client"
import { AuthResponseSchema, type LoginInput, type RegisterInput } from "@test-platform/shared/schemas"

export function postLogin(data: LoginInput) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}

export function postRegister(data: RegisterInput) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    schema: AuthResponseSchema,
  })
}