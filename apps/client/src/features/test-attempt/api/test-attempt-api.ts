import { apiFetch } from "@/shared/lib/api-client"
import {
    ActiveAttemptResponseSchema,
    UpdateAnswerResponseSchema,
    SubmitAttempResponseSchema,
    type UpdateAnswerRequest
} from "@test-platform/shared/schemas"

export function fetchActiveAttempt() {
  return apiFetch(`/attempts/active`, {
    method: "GET",
    schema: ActiveAttemptResponseSchema,
  })
}

export function updateQuestionAnswer(testAttemptId: string, body: UpdateAnswerRequest) {
    return apiFetch(`/attempts/${testAttemptId}/answer`, {
        method: "PATCH",
        body: JSON.stringify(body),
        schema: UpdateAnswerResponseSchema,
    })
}

export function submitAttempt(testAttemptId: string) {
    return apiFetch(`/attempts/${testAttemptId}/submit`, {
        method: "POST",
        schema: SubmitAttempResponseSchema,
    })
}
