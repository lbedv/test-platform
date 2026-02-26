import { useParams } from "@tanstack/react-router"
import { useAttemptResult } from "./use-attempt-result"

export function useTestResultsPage() {
  const { id } = useParams({ strict: false })

  const { data: result, isLoading, isError } = useAttemptResult(id)

  return { result: result ?? null, attemptId: id ?? "", isLoading, isError }
}
