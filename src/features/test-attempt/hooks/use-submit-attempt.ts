import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { submitAttempt } from "../api/attempt-api"
import type { TestAnswer } from "../types"

export function useSubmitAttempt() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({
      attemptId,
      answers,
    }: {
      attemptId: string
      answers: TestAnswer[]
    }) => submitAttempt(attemptId, answers),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.attempts() })
      qc.invalidateQueries({ queryKey: queryKeys.dashboard.stats() })
    },
  })
}
