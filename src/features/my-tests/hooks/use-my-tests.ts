import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { getMyTests, deleteTest } from "../api/my-tests-api"

export function useMyTests() {
  return useQuery({
    queryKey: queryKeys.myTests.list(),
    queryFn: getMyTests,
  })
}

export function useDeleteTest() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTest(id),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.myTests.list() })
    },
  })
}
