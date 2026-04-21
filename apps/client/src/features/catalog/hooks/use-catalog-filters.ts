import { useNavigate, useSearch } from "@tanstack/react-router"
import { ITEMS_PER_PAGE, OPTION_ALL } from "../constants"
import { useCatalogTests } from "./use-catalog-tests"
import type { CatalogFilterRequest} from "@test-platform/shared/schemas"
import PathConstants from "@/routes/path-constants"
import { useMemo } from "react"

/**
 * Hook for managing catalog page filters and pagination state.
 * Handles search, category, difficulty, sorting, and ownership filters.
 * Fetches paginated test list from backend and provides computed values.
 */
export function useCatalogFilters() {

  const navigate = useNavigate({ from: PathConstants.CATALOG });
  
  // 1. Read the exact URL state (Fully Type-Safe!)
  const searchParams = useSearch({ from: "/app/catalog" });

  // 2. Derive filters with pagination
  const currentPage = searchParams.page ? Number(searchParams.page) : undefined;
  
  const filters: CatalogFilterRequest = {
    search: searchParams.search || "",
    sortBy: searchParams.sortBy,
    ownership: searchParams.ownership,
    category: searchParams.category,
    difficulty: searchParams.difficulty,
    page: currentPage,
  };

  const { data, isLoading, error: isError } = useCatalogTests({...filters})
  const tests = data?.tests || [];
  const resultCount = data?.totalCount || 0;

  const totalPages = useMemo(() => Math.ceil(resultCount / ITEMS_PER_PAGE), [resultCount]);

  const handleFilterChange = (key: keyof CatalogFilterRequest, value: string) => {
    navigate({
      search: (prev) => {
        const newParams = { ...prev };
        
        if (value === OPTION_ALL || !value) {
          delete newParams[key];
        } else {
          // @ts-expect-error - dynamic key assignment requires a bit of TS wrangling
          newParams[key] = value;
        }
        
        // Remove page param when filters change
        newParams.page = undefined;
        
        return newParams;
      },
      replace: true, 
    });
  };

  function setCurrentPage(page: number) {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
      replace: true,
    });
  }

  function clearFilters() {
    navigate({
      search: (prev) => ({
        ownership: prev.ownership,
        page: undefined,
      }),
      replace: true,
    });
  }

  return {
    filters,
    isLoading,
    isError,
    // Computed values
    paginatedItems: tests,
    totalPages,
    currentPage,
    resultCount,
    // Handlers
    handleFilterChange,
    clearFilters,
    setCurrentPage,
  }
}
