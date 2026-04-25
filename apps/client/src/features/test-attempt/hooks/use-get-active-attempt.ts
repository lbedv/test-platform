import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchActiveAttempt } from "../api/test-attempt-api"

/**
 * Custom hook for fetching the currently active test attempt.
 * Uses React Query to cache and manage the active attempt data.
 * @returns Query object with active attempt data
 */
export function useGetActiveAttempt() {
  return useQuery({
    queryKey: queryKeys.attempt.active(),
    queryFn: () => fetchActiveAttempt(),
  })
}