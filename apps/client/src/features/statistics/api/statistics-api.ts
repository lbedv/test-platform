import { apiFetch } from "@/shared/lib/api-client"
import { UserTestResponseSchema, TestStatsResponseSchema, AttemptStatsResponseSchema } from "@test-platform/shared/schemas"

export function fetchUserTests() {
  return apiFetch(`/tests/my-tests`, {
    method: "GET",
    schema: UserTestResponseSchema.array(),
  })
}

export function fetchTestStats(testId: string) {
  return apiFetch(`/tests/${testId}/stats`, {
    method: "GET",
    schema: TestStatsResponseSchema,
  })
}

export function fetchTestAttempts(testId: string) {
  return apiFetch(`/tests/${testId}/attempts`, {
    method: "GET",
    schema: AttemptStatsResponseSchema.array(),
  })
}
