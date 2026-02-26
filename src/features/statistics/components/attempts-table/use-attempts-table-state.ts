import { useState, useMemo } from "react"
import type { TestAttempt } from "../../types"
import { ATTEMPTS_PER_PAGE } from "../../statistics-data"

export type SortKey = "date" | "score" | "time" | "status"
type SortDir = "asc" | "desc"
type StatusFilter = "all" | "pass" | "fail"

export function useAttemptsTableState(attempts: TestAttempt[]) {
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>("date")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const filtered = useMemo(() => {
    if (statusFilter === "all") return attempts
    return attempts.filter((a) => a.status === statusFilter)
  }, [attempts, statusFilter])

  const sorted = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "score":
          cmp = a.score - b.score
          break
        case "time":
          cmp = a.timeTaken - b.timeTaken
          break
        case "status":
          cmp = a.status.localeCompare(b.status)
          break
      }
      return sortDir === "asc" ? cmp : -cmp
    })
    return list
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
    filtered,
    sorted,
    pageItems,
    totalPages,
    safePage,
    toggleSort,
    handleFilterChange,
  }
}
