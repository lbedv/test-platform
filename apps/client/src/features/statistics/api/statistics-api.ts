import { apiFetch } from "@/shared/lib/api-client"
import { UserTestResponseSchema, TestStatsResponseSchema, AttemptStatsResponseSchema } from "@test-platform/shared/schemas"

/**
 * Fetches all tests created by the current user.
 * @returns Promise resolving to array of user's tests
 */
export function fetchUserTests() {
  return apiFetch(`/tests/my-tests`, {
    method: "GET",
    schema: UserTestResponseSchema.array(),
  })
}

/**
 * Fetches statistics for a specific test.
 * @param testId - The ID of the test to get statistics for
 * @returns Promise resolving to test statistics response
 */
export function fetchTestStats(testId: string) {
  return apiFetch(`/tests/${testId}/stats`, {
    method: "GET",
    schema: TestStatsResponseSchema,
  })
}

/**
 * Fetches all attempts for a specific test.
 * @param testId - The ID of the test to get attempts for
 * @returns Promise resolving to array of attempt statistics
 */
export function fetchTestAttempts(testId: string) {
  return apiFetch(`/tests/${testId}/attempts`, {
    method: "GET",
    schema: AttemptStatsResponseSchema.array(),
  })
}
