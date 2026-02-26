import { apiFetch } from "@/lib/api-client"
import type { CreatedTest, TestStats, TestAttempt } from "../types"

export function getCreatedTests() {
  return apiFetch<CreatedTest[]>("/tests/mine/published")
}

export function getTestStats(testId: string) {
  return apiFetch<TestStats>(`/tests/${testId}/stats`)
}

export function getTestAttempts(testId: string) {
  return apiFetch<TestAttempt[]>(`/tests/${testId}/attempts`)
}
