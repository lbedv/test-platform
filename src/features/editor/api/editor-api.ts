import { apiFetch } from "@/lib/api-client"
import type { MockTest } from "../types"

export interface TestForEditResponse extends MockTest {
  status: "draft" | "published"
}

export function getTestForEdit(id: string) {
  return apiFetch<TestForEditResponse>(`/tests/${id}/edit`)
}

export function createTest(payload: MockTest) {
  return apiFetch<{ id: string }>("/tests", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function updateTest(id: string, payload: MockTest) {
  return apiFetch<void>(`/tests/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export function publishTest(id: string) {
  return apiFetch<void>(`/tests/${id}/publish`, {
    method: "PATCH",
  })
}
