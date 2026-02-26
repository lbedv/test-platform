import { apiFetch } from "@/lib/api-client"
import type { TestResult } from "../types"

export function getAttemptResult(attemptId: string) {
  return apiFetch<TestResult>(`/attempts/${attemptId}/results`)
}
