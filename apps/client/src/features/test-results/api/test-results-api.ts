import { apiFetch } from "@/shared/lib/api-client"
import { AttemptResultsResponseSchema } from "@test-platform/shared/schemas"

/**
 * Fetches the results for a completed test attempt.
 * @param testAttemptId - The ID of the test attempt to get results for
 * @returns Promise resolving to attempt results response
 */
export function fetchAttemptResults(testAttemptId: string) {
    return apiFetch(`/attempts/${testAttemptId}/results`, {
        method: "GET",
        schema: AttemptResultsResponseSchema,
    })
}
