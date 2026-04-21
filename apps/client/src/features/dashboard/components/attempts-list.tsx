import { Link } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/common"
import { AttemptCard } from "./attempt-card"
import { usePagination } from "@/shared/hooks/use-pagination"
import { ITEMS_PER_PAGE } from "../constants"
import type { AttemptItem } from "../types"
import { DashboardEmpty } from "./dashboard-empty"

interface AttemptsListProps{
  attempts: AttemptItem[]
}

/**
 * AttemptsList component - Displays a paginated list of recent test attempts.
 * Shows AttemptCard for each attempt and includes pagination controls.
 */
export function AttemptsList({ attempts }: AttemptsListProps) {

  const { paginatedItems, currentPage, totalPages, setCurrentPage } = 
    usePagination(attempts, ITEMS_PER_PAGE)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Attempts</h2>
        <Button asChild variant="outline" size="sm">
            <Link to={PathConstants.CATALOG}>
              Browse Tests
            </Link>
         </Button>
      </div>

        {paginatedItems.length === 0 ? (
          <DashboardEmpty />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedItems.map((item) => (
              <AttemptCard key={item.id} attempt={item} />
            ))}
          </div>
        )}

      <div className="mt-4">
        <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
      </div>
    </section>
  )
}