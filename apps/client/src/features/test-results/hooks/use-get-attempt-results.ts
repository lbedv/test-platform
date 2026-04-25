import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchAttemptResults } from "../api/test-results-api"

/**
 * Custom hook for fetching test attempt results.
 * Uses route parameter to get attempt ID and caches results indefinitely.
 * @returns Query object with attempt results data
 */
export function useGetAttemptResults() {
  const { id } = useParams({ from: "/app/results/$id" })

    return useQuery({
    queryKey: queryKeys.results.detail(id),
    queryFn: () => fetchAttemptResults(id),
    enabled: !!id,
    staleTime: Infinity, // Results are immutable
    gcTime: Infinity,
  })
}