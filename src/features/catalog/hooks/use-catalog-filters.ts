import { useState } from "react"
import { ITEMS_PER_PAGE } from "../catalog-data"
import type { SortOption, TestOwnership } from "../types"
import { useCatalogTests } from "./use-catalog"

export function useCatalogFilters() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All Categories")
  const [difficulty, setDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [ownership, setOwnership] = useState<TestOwnership | "all">("all")
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useCatalogTests({
    search: search.trim() || undefined,
    category: category !== "All Categories" ? category : undefined,
    difficulty: difficulty !== "all" ? difficulty : undefined,
    sortBy,
    ownership: ownership !== "all" ? ownership : undefined,
    page,
    limit: ITEMS_PER_PAGE,
  })

  const paginated = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const resultCount = data?.total ?? 0
  const safePage = Math.min(page, totalPages)

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
    filtered: paginated,
    paginated,
    totalPages,
    safePage,
    hasFilters,
    resultCount,
    // Loading / error
    isLoading,
    isError,
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
