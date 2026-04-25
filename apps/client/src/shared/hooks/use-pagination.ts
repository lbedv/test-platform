import { useState, useMemo } from "react"

interface UsePaginationResult<T> {
  paginatedItems: T[]
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

/**
 * Generic custom hook for handling pagination of arrays.
 * @param items - Array of items to paginate
 * @param itemsPerPage - Number of items per page
 * @returns Object with paginated items and pagination controls
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, currentPage, itemsPerPage])

  const setPage = (page: number) => {
    const safePage = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(safePage)
  }

  return {
    paginatedItems,
    currentPage,
    totalPages,
    setCurrentPage: setPage,
  }
}