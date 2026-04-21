import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { CatalogFilterRequest} from "@test-platform/shared/schemas"
import { queryKeys } from "@/shared/lib/query-keys";
import { fetchCatalogTests } from "../api/catalog-api";

/**
 * useCatalogTests hook - Filters and sorts catalog tests based on provided parameters.
 * Returns a memoized list of tests that match the criteria with backend pagination.
 * Text search is debounced by 0.5 seconds to reduce unnecessary queries while typing.
 */
export function useCatalogTests(params: CatalogFilterRequest) {
  const search = params.search ?? ""

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const debouncedParams = {
    ...params,
    search: debouncedSearch,
  };

  return useQuery({
    queryKey: queryKeys.catalog.list(debouncedParams),
    queryFn: () => fetchCatalogTests(debouncedParams),
    placeholderData: (previousData) => previousData, 
  });
}