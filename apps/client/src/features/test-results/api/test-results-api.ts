import { apiFetch } from "@/shared/lib/api-client"
import { AttemptResultsResponseSchema } from "@test-platform/shared/schemas"

export function fetchAttemptResults(testAttemptId: string) {
    return apiFetch(`/attempts/${testAttemptId}/results`, {
        method: "GET",
        schema: AttemptResultsResponseSchema,
    })
}
