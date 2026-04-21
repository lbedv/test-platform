import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchActiveAttempt } from "../api/test-attempt-api"

export function useGetActiveAttempt() {
  return useQuery({
    queryKey: queryKeys.attempt.active(),
    queryFn: () => fetchActiveAttempt(),
  })
}