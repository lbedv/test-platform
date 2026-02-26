import { apiFetch } from "@/lib/api-client"
import type { UserTest } from "../types"

export function getMyTests() {
  return apiFetch<UserTest[]>("/tests/mine")
}

export function deleteTest(id: string) {
  return apiFetch<void>(`/tests/${id}`, { method: "DELETE" })
}
