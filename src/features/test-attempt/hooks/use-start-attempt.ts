import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { startAttempt } from "../api/attempt-api"

export function useStartAttempt(testId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.attempt.detail(testId ?? ""),
    queryFn: () => startAttempt(testId!),
    enabled: !!testId,
    staleTime: Infinity, // don't refetch once started
    gcTime: Infinity,
  })
}
