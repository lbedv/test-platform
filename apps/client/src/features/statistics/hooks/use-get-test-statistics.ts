import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchTestStats, fetchTestAttempts, fetchUserTests } from "../api/statistics-api"

/**
 * Custom hook for fetching tests created by the current user.
 * @returns Query object with user's tests data
 */
export function useGetUserTests() {
  return useQuery({
    queryKey: queryKeys.statistics.userTests(),
    queryFn: () => fetchUserTests(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

/**
 * Custom hook for fetching statistics for a specific test.
 * @param testId - The ID of the test to get statistics for
 * @returns Query object with test statistics data
 */
export function useGetTestStats(testId: string) {
  return useQuery({
    queryKey: queryKeys.statistics.stats(testId || ""),
    queryFn: () => fetchTestStats(testId!),
    enabled: !!testId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

/**
 * Custom hook for fetching all attempts for a specific test.
 * @param testId - The ID of the test to get attempts for
 * @returns Query object with test attempts data
 */
export function useGetTestAttempts(testId: string) {
  return useQuery({
    queryKey: queryKeys.statistics.attempts(testId || ""),
    queryFn: () => fetchTestAttempts(testId!),
    enabled: !!testId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
