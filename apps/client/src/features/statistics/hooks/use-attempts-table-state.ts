import { useState, useMemo } from "react"
import type { TestAttempt } from "../types"
import { ATTEMPTS_PER_PAGE } from "../constants"

export type SortKey = "date" | "score" | "time" | "status"
type SortDir = "asc" | "desc"
type StatusFilter = "all" | "pass" | "fail"

/**
 * Custom hook for managing attempts table state with sorting, filtering, and pagination.
 * @param attempts - Array of test attempts to display
 * @returns Object with table state and control functions
 */
export function useAttemptsTableState(attempts: TestAttempt[]) {
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const filtered = useMemo(() => {
    if (statusFilter === "all") return attempts
    return attempts.filter((a) => a.isPassed === (statusFilter === "pass"))
  }, [attempts, statusFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "date":
          cmp = Date.parse(a.completedAt) - Date.parse(b.completedAt)
          break
        case "score":
          cmp = a.percentage - b.percentage
          break
        case "time":
          cmp = a.timeTakenSeconds - b.timeTakenSeconds
          break
        case "status":
          cmp = Number(a.isPassed) - Number(b.isPassed)
          break
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / ATTEMPTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const pageItems = sorted.slice(
    (safePage - 1) * ATTEMPTS_PER_PAGE,
    safePage * ATTEMPTS_PER_PAGE
  )

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
    setPage(1)
  }

  function handleFilterChange(value: string) {
    setStatusFilter(value as StatusFilter)
    setPage(1)
  }

  return {
    page,
    setPage,
    sortKey,
    sortDir,
    statusFilter,
    filteredCount: filtered.length,
    sortedCount: sorted.length,
    pageItems,
    totalPages,
    safePage,
    toggleSort,
    handleFilterChange,
  }
}
