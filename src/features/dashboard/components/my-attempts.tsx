import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { AttemptCard } from "./attempt-card"
import { RECENT_ATTEMPTS } from "../dashboard-data"
import { Pagination } from "@/components/common/pagination"

export function MyAttempts() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  const totalPages = Math.max(1, Math.ceil(RECENT_ATTEMPTS.length / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedAttempts = RECENT_ATTEMPTS.slice(startIndex, startIndex + pageSize)

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
    </section>
  )
}
