import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { queryKeys } from "@/shared/lib/query-keys"
import { fetchAttemptResults } from "../api/test-results-api"

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