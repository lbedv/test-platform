import { Link } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader, Pagination } from "@/components/common"
import {
  CatalogToolbar,
  CatalogCard,
  CatalogEmpty,
  useCatalogFilters,
} from "@/features/catalog"

export function CatalogPage() {
  const {
    search,
    category,
    difficulty,
    sortBy,
    ownership,
    paginated,
    totalPages,
    safePage,
    hasFilters,
    resultCount,
    handleSearchChange,
    handleCategoryChange,
    handleDifficultyChange,
    handleSortChange,
    handleOwnershipChange,
    clearFilters,
    setPage,
  } = useCatalogFilters()

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Browse Tests"
        description="Explore your tests or discover public tests from the community."
      >
        <Button asChild size="sm">
          <Link to={PathConstants.MY_TESTS}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Test
          </Link>
        </Button>
      </PageHeader>
      <CatalogToolbar
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        ownership={ownership}
        onOwnershipChange={handleOwnershipChange}
        resultCount={resultCount}
      />
      {paginated.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((test) => (
            <CatalogCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <CatalogEmpty hasFilters={hasFilters} onClearFilters={clearFilters} />
      )}
      <Pagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  )
}
