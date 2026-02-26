import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { User2 } from "lucide-react"
import { ScoreBadge } from "./score-badge"
import { formatDate, formatTime, formatDuration } from "./attempt-formatters"
import type { TestAttempt } from "../../types"

interface AttemptDisplayProps {
  attempt: TestAttempt
}

// Desktop table row display
export function AttemptTableRow({ attempt }: AttemptDisplayProps) {
  return (
    <TableRow>
      <TableCell>
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User2 className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {attempt.participant ?? "Anonymous"}
          </span>
        </span>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm text-foreground">{formatDate(attempt.date)}</span>
          <span className="text-xs text-muted-foreground">{formatTime(attempt.date)}</span>
        </div>
      </TableCell>

      <TableCell>
        <ScoreBadge score={attempt.score} />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <span className="text-sm text-muted-foreground">
          {attempt.pointsEarned}/{attempt.pointsTotal}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-sm text-foreground">
          {formatDuration(attempt.timeTaken)}
        </span>
      </TableCell>

      <TableCell>
        <Badge
          variant={attempt.status === "pass" ? "default" : "destructive"}
          className={
            attempt.status === "pass"
              ? "bg-success text-success-foreground hover:bg-success/90"
              : ""
          }
        >
          {attempt.status === "pass" ? "Pass" : "Fail"}
        </Badge>
      </TableCell>
    </TableRow>
  )
}

// Mobile card display
export function AttemptCard({ attempt }: AttemptDisplayProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User2 className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
          <span className="text-sm font-medium text-foreground">
            {attempt.participant ?? "Anonymous"}
          </span>
        </span>
        <Badge
          variant={attempt.status === "pass" ? "default" : "destructive"}
          className={
            attempt.status === "pass"
              ? "bg-success text-success-foreground hover:bg-success/90"
              : ""
          }
        >
          {attempt.status === "pass" ? "Pass" : "Fail"}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Score</p>
          <ScoreBadge score={attempt.score} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-sm font-medium text-foreground">
            {formatDuration(attempt.timeTaken)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="text-sm font-medium text-foreground">
            {formatDate(attempt.date)}
          </p>
        </div>
      </div>
    </div>
  )
}
