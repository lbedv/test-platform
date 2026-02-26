import { useMemo, useState } from "react"
import { DEMO_CATALOG, ITEMS_PER_PAGE } from "../catalog-data"
import type { SortOption, TestOwnership, CatalogTest } from "../types"

export function useCatalogFilters() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [difficulty, setDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [ownership, setOwnership] = useState<TestOwnership | "all">("all")
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = [...DEMO_CATALOG]
    if (ownership !== "all") {
      result = result.filter((t) => t.ownership === ownership)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      )
    }
    if (category !== "All Categories") {
      result = result.filter((t) => t.category === category)
    }
    if (difficulty !== "all") {
      result = result.filter((t) => t.difficulty === difficulty)
    }
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        case "attempts":
          return b.attempts - a.attempts
        case "score":
          return (b.bestScore ?? -1) - (a.bestScore ?? -1)
        default:
          return 0
      }
    })
    return result
  }, [search, category, difficulty, sortBy, ownership])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginated: CatalogTest[] = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const hasFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    difficulty !== "all" ||
    ownership !== "all"

  function clearFilters() {
    setSearch("")
    setCategory("All Categories")
    setDifficulty("all")
    setOwnership("all")
    setSortBy("newest")
    setPage(1)
  }

  function handleSearchChange(v: string) {
    setSearch(v)
    setPage(1)
  }

  function handleCategoryChange(v: string) {
    setCategory(v)
    setPage(1)
  }

  function handleDifficultyChange(v: string) {
    setDifficulty(v)
    setPage(1)
  }

  function handleSortChange(v: SortOption) {
    setSortBy(v)
    setPage(1)
  }

  function handleOwnershipChange(v: TestOwnership | "all") {
    setOwnership(v)
    setPage(1)
  }

  return {
    // State
    search,
    category,
    difficulty,
    sortBy,
    ownership,
    page,
    // Computed values
    filtered,
    paginated,
    totalPages,
    safePage,
    hasFilters,
    resultCount: filtered.length,
    // Handlers
    handleSearchChange,
    handleCategoryChange,
    handleDifficultyChange,
    handleSortChange,
    handleOwnershipChange,
    clearFilters,
    setPage,
  }
}
