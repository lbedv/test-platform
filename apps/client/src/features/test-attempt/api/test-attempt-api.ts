import { apiFetch } from "@/shared/lib/api-client"
import {
    ActiveAttemptResponseSchema,
    UpdateAnswerResponseSchema,
    SubmitAttempResponseSchema,
    type UpdateAnswerRequest
} from "@test-platform/shared/schemas"

/**
 * Fetches the currently active test attempt for the authenticated user.
 * @returns Promise resolving to active attempt data
 */
export function fetchActiveAttempt() {
  return apiFetch(`/attempts/active`, {
    method: "GET",
    schema: ActiveAttemptResponseSchema,
  })
}

/**
 * Updates the answer for a specific question in a test attempt.
 * @param testAttemptId - The ID of the test attempt
 * @param body - The answer update request data
 * @returns Promise resolving to update response
 */
export function updateQuestionAnswer(testAttemptId: string, body: UpdateAnswerRequest) {
    return apiFetch(`/attempts/${testAttemptId}/answer`, {
        method: "PATCH",
        body: JSON.stringify(body),
        schema: UpdateAnswerResponseSchema,
    })
}

/**
 * Submits a test attempt, marking it as completed.
 * @param testAttemptId - The ID of the test attempt to submit
 * @returns Promise resolving to submit response
 */
export function submitAttempt(testAttemptId: string) {
    return apiFetch(`/attempts/${testAttemptId}/submit`, {
        method: "POST",
        schema: SubmitAttempResponseSchema,
    })
}
