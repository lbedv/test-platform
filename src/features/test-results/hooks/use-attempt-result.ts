import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { getAttemptResult } from "../api/results-api"

export function useAttemptResult(attemptId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.results.detail(attemptId ?? ""),
    queryFn: () => getAttemptResult(attemptId!),
    enabled: !!attemptId,
  })
}
