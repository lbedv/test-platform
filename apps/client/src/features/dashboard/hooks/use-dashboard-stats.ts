import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/shared/lib/query-keys";
import { fetchDashboardStats } from "../api/dashboard-api";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: () => fetchDashboardStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}