import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchTestStats, fetchTestAttempts, fetchUserTests } from "../api/statistics-api"

export function useGetUserTests() {
  return useQuery({
    queryKey: queryKeys.statistics.userTests(),
    queryFn: () => fetchUserTests(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export function useGetTestStats(testId: string) {
  return useQuery({
    queryKey: queryKeys.statistics.stats(testId || ""),
    queryFn: () => fetchTestStats(testId!),
    enabled: !!testId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useGetTestAttempts(testId: string) {
  return useQuery({
    queryKey: queryKeys.statistics.attempts(testId || ""),
    queryFn: () => fetchTestAttempts(testId!),
    enabled: !!testId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
