import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchCompletedAttempts } from "../api/dashboard-api"

/**
 * Custom hook for fetching completed test attempts for dashboard display.
 * Uses placeholder data to prevent loading states on refetch.
 * @returns Query object with completed attempts data
 */
export function useCompletedAttempts() {
  return useQuery({
    queryKey: queryKeys.dashboard.attempts(),
    queryFn: fetchCompletedAttempts,
    placeholderData: (previousData) => previousData, 
  })
}