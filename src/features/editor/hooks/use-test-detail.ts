import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { getTestForEdit } from "../api/editor-api"

export function useTestForEdit(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.editor.detail(id ?? ""),
    queryFn: () => getTestForEdit(id!),
    enabled: !!id,
  })
}
