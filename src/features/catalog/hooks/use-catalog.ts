import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import { getCatalogTests, type CatalogParams } from "../api/catalog-api"

export function useCatalogTests(params: CatalogParams) {
  return useQuery({
    queryKey: queryKeys.catalog.list(params as Record<string, unknown>),
    queryFn: () => getCatalogTests(params),
  })
}
