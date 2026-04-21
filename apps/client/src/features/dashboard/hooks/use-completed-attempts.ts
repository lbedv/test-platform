import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchCompletedAttempts } from "../api/dashboard-api"

export function useCompletedAttempts() {
  return useQuery({
    queryKey: queryKeys.dashboard.attempts(),
    queryFn: fetchCompletedAttempts,
    placeholderData: (previousData) => previousData, 
  })
}