import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import {
  getDashboardStats,
  getRecentAttempts,
  getUserProfile,
} from "../api/dashboard-api"

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: getDashboardStats,
  })
}

export function useRecentAttempts() {
  return useQuery({
    queryKey: queryKeys.dashboard.attempts(),
    queryFn: getRecentAttempts,
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: getUserProfile,
  })
}
