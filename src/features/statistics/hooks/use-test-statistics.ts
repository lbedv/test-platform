import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import {
  getCreatedTests,
  getTestStats,
  getTestAttempts,
} from "../api/statistics-api"

export function useCreatedTests() {
  return useQuery({
    queryKey: queryKeys.statistics.tests(),
    queryFn: getCreatedTests,
  })
}

export function useTestStats(testId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.statistics.stats(testId ?? ""),
    queryFn: () => getTestStats(testId!),
    enabled: !!testId,
  })
}

export function useTestAttempts(testId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.statistics.attempts(testId ?? ""),
    queryFn: () => getTestAttempts(testId!),
    enabled: !!testId,
  })
}
