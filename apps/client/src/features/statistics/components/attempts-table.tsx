import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination } from "@/components/common"
import { SortTableHeader } from "./sort-table-header"
import { AttemptTableRow, AttemptCard } from "./attempt-display"
import { useAttemptsTableState, type SortKey } from "../hooks/use-attempts-table-state"
import type { TestAttempt } from "../types"

interface AttemptsTableProps {
  totalPoints: number
  attempts: TestAttempt[]
}

export function AttemptsTable({ totalPoints, attempts }: AttemptsTableProps) {
  const {
    setPage,
    sortKey,
    sortDir,
    statusFilter,
    filteredCount,
    sortedCount,
    pageItems,
    totalPages,
    safePage,
    toggleSort,
    handleFilterChange,
  } = useAttemptsTableState(attempts)

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base font-semibold text-foreground">
          Individual Attempts
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filteredCount} {filteredCount === 1 ? "result" : "results"})
          </span>
        </CardTitle>

        <Select value={statusFilter} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pass">Passed</SelectItem>
            <SelectItem value="fail">Failed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-0 pb-0 sm:px-6 sm:pb-6">
        {sortedCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No attempts match the current filter.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => handleFilterChange("all")}
            >
              Clear filter
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-45">Participant</TableHead>
                    <SortTableHeader
                      label="Date / Time"
                      sortKey="date"
                      currentSortKey={sortKey}
                      currentSortDir={sortDir}
                      onSort={(key) => toggleSort(key as SortKey)}
                    />
                    <SortTableHeader
                      label="Score"
                      sortKey="score"
                      currentSortKey={sortKey}
                      currentSortDir={sortDir}
                      onSort={(key) => toggleSort(key as SortKey)}
                    />
                    <TableHead className="hidden md:table-cell">Points</TableHead>
                    <SortTableHeader
                      label="Time Taken"
                      sortKey="time"
                      currentSortKey={sortKey}
                      currentSortDir={sortDir}
                      onSort={(key) => toggleSort(key as SortKey)}
                    />
                    <SortTableHeader
                      label="Status"
                      sortKey="status"
                      currentSortKey={sortKey}
                      currentSortDir={sortDir}
                      onSort={(key) => toggleSort(key as SortKey)}
                    />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((attempt) => (
                    <AttemptTableRow key={attempt.id} totalPoints={totalPoints} attempt={attempt} />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile card list */}
            <div className="flex flex-col gap-3 px-4 sm:hidden">
              {pageItems.map((attempt) => (
                <AttemptCard key={attempt.id} totalPoints={totalPoints} attempt={attempt} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 px-4 pb-4 sm:px-0 sm:pb-0">
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}