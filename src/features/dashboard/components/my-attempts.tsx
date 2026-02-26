import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { AttemptCard } from "./attempt-card"
import { useRecentAttempts } from "../hooks/use-dashboard"
import { Pagination } from "@/components/common/pagination"
import { Skeleton } from "@/components/ui/skeleton"

export function MyAttempts() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const { data: recentAttempts, isLoading, isError } = useRecentAttempts()

  const attempts = recentAttempts ?? []
  const totalPages = Math.max(1, Math.ceil(attempts.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedAttempts = attempts.slice(startIndex, startIndex + pageSize)

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Recent Attempts</h2>
        <Button
          onClick={() => navigate({ to: PathConstants.CATALOG })}
          variant="outline"
          size="sm"
        >
          Browse Tests
        </Button>
      </div>

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive">Failed to load recent attempts.</p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedAttempts.map((attempt) => (
              <AttemptCard key={attempt.id} attempt={attempt} />
            ))}
          </div>

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setCurrentPage(Math.min(Math.max(1, p), totalPages))}
            />
          </div>
        </>
      )}
    </section>
  )
}
