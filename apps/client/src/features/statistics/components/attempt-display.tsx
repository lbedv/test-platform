import { TableCell, TableRow } from "@/components/ui/table"
import { User2 } from "lucide-react"
import { AttemptScoreBadge, AttemptResultBadge } from "./attempt-badges"
import { formatDate, formatDuration } from "@/shared/lib/date"
import type { TestAttempt } from "../types"

interface AttemptDisplayProps {
  totalPoints: number
  attempt: TestAttempt
}

// Desktop table row display
export function AttemptTableRow({ totalPoints, attempt }: AttemptDisplayProps) {
  return (
    <TableRow>
      <TableCell>
        <span className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
            <User2 className="h-3.5 w-3.5 text-muted-foreground" />
          </span>
          <span className="truncate text-sm font-medium text-foreground">
            {`${attempt.participant.firstName} ${attempt.participant.lastName}`}
          </span>
        </span>
      </TableCell>

      <TableCell>
        <div className="flex flex-col">
          <span className="text-sm text-foreground">{formatDate(attempt.completedAt)}</span>
        </div>
      </TableCell>

      <TableCell>
        <AttemptScoreBadge score={attempt.percentage} />
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <span className="text-sm text-muted-foreground">
          {attempt.pointsEarned}/{totalPoints}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-sm text-foreground">
          {formatDuration(attempt.timeTakenSeconds)}
        </span>
      </TableCell>

      <TableCell>
        <AttemptResultBadge isPassed={attempt.isPassed} />
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
            {`${attempt.participant.firstName} ${attempt.participant.lastName}`}
          </span>
        </span>
        <AttemptResultBadge isPassed={attempt.isPassed} />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Score</p>
          <AttemptScoreBadge score={attempt.percentage} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Time</p>
          <p className="text-sm font-medium text-foreground">
            {formatDuration(attempt.timeTakenSeconds)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Date</p>
          <p className="text-sm font-medium text-foreground">
            {formatDate(attempt.completedAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
