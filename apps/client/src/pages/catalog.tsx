import { PageHeader, Pagination } from "@/components/common"
import { Button } from "@/components/ui/button"
import {
  CatalogToolbar,
  CatalogCard,
  useCatalogFilters,
  CatalogEmpty,
  TestActionsDialog,
} from "@/features/catalog"
import { useStartAttempt } from "@/features/catalog/hooks/use-start-attempt"
import { useDeleteTest } from "@/features/catalog/hooks/use-delete-test"
import PathConstants from "@/routes/path-constants"
import { PlusCircle } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import type { TestSummary } from "@test-platform/shared/schemas"

// CatalogPage component - Displays a list of tests with filtering and pagination.
export function CatalogPage() {
  const [selectedTest, setSelectedTest] = useState<TestSummary | null>(null)
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { mutate: startAttempt, isPending: isStarting } = useStartAttempt()
  const { mutate: deleteTestMutation, isPending: isDeleting } = useDeleteTest()

  const {
    filters,
    isLoading,
    isError,
    paginatedItems,
    totalPages,
    currentPage,
    resultCount,
    handleFilterChange,
    clearFilters,
    setCurrentPage,
  } = useCatalogFilters()

  const handleOpenTestInfo = (test: TestSummary) => {
    setSelectedTest(test)
    setIsInfoDialogOpen(true)
  }

  const handleOpenDeleteConfirm = (test: TestSummary) => {
    setSelectedTest(test)
    setIsDeleteDialogOpen(true)
  }

  const handleStartTest = () => {
    if (selectedTest) {
      startAttempt(selectedTest.id)
      setIsInfoDialogOpen(false)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedTest) {
      deleteTestMutation(selectedTest.id)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen gap-6">
      <PageHeader
        title="Browse Tests"
        description="Explore your tests or discover public tests from the community."
      >
        <Button asChild size="sm">
          <Link to={PathConstants.CREATE_TEST}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Test
          </Link>
        </Button>
      </PageHeader>
      <CatalogToolbar
        filterParams={filters}
        resultCount={resultCount}
        onSearchChange={handleFilterChange}
        clearFilters={clearFilters}
      />

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="`h-50 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">Failed to load catalog.</p>
      )}

      {!isLoading && !isError && (
        <>
          {paginatedItems.length === 0 ? (
            <CatalogEmpty />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedItems.map((test) => (
                <CatalogCard
                  key={test.id}
                  test={test}
                  isStarting={isStarting && selectedTest?.id === test.id}
                  isDeleting={isDeleting && selectedTest?.id === test.id}
                  onOpenTestInfo={handleOpenTestInfo}
                  onOpenDeleteConfirm={handleOpenDeleteConfirm}
                />
              ))}
            </div>
          )}
          <div className="mt-auto py-6 border-t bg-background">
            <Pagination
              currentPage={currentPage ?? 1}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      <TestActionsDialog
        test={selectedTest}
        isInfoDialogOpen={isInfoDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        isStarting={isStarting}
        isDeleting={isDeleting}
        onInfoDialogOpenChange={setIsInfoDialogOpen}
        onDeleteDialogOpenChange={setIsDeleteDialogOpen}
        onStartTest={handleStartTest}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  )
}
