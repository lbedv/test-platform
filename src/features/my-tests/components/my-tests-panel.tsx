import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { MyTestCard } from "./my-test-card"
import { USER_TESTS_MOCK } from "../my-tests-data"
import { useState } from "react"
import { Pagination } from "@/components/common/pagination"

interface MyTestsPanelProps {
  onCreateNew: () => void
}

export function MyTestsPanel({ onCreateNew }: MyTestsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const totalPages = Math.max(1, Math.ceil(USER_TESTS_MOCK.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedTests = USER_TESTS_MOCK.slice(startIndex, startIndex + pageSize)
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Tests</h2>
          <p className="text-sm text-muted-foreground">
            Manage your created tests or start a new one.
          </p>
        </div>
        <Button onClick={onCreateNew} size="sm" className="mt-3 sm:mt-0">
          <Plus className="mr-1.5 h-4 w-4" />
          Create New Test
        </Button>
      </div>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedTests.map((test) => (
          <MyTestCard key={test.id} test={test} />
        ))}
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p) => setCurrentPage(Math.min(Math.max(1, p), totalPages))}
        />
      </div>
    </section>
  )
}
