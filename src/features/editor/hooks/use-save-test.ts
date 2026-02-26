import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { createTest, updateTest, publishTest } from "../api/editor-api"
import type { MockTest } from "../types"

export function useCreateTest() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (payload: MockTest) => createTest(payload),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.myTests.list() })
    },
  })
}

export function useUpdateTest() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: MockTest }) =>
      updateTest(id, payload),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.myTests.list() })
    },
  })
}

export function usePublishTest() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => publishTest(id),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.myTests.list() })
    },
  })
}
