import { apiFetch } from "@/lib/api-client"
import type { TestData, TestAnswer } from "../types"

export interface StartAttemptResponse {
  attemptId: string
  test: TestData
}

export interface SubmitAttemptResponse {
  resultId: string
}

export function startAttempt(testId: string) {
  return apiFetch<StartAttemptResponse>("/attempts", {
    method: "POST",
    body: JSON.stringify({ testId }),
  })
}

export function submitAttempt(attemptId: string, answers: TestAnswer[]) {
  return apiFetch<SubmitAttemptResponse>(`/attempts/${attemptId}/submit`, {
    method: "POST",
    body: JSON.stringify({ answers }),
  })
}
