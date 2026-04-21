import { Link } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, RotateCcw, ArrowRight } from "lucide-react"
import { IconStat } from "@/components/common"
import { formatRelativeTime, formatDuration } from "@/shared/lib/date";
import type { AttemptItem } from "../types"
import { CATEGORY_LABELS } from "@/shared/constants/labels"
import { useStartAttempt } from "@/features/catalog"

interface AttemptCardProps {
  attempt: AttemptItem
}

/**
 * AttemptCard component - Card displaying a single test attempt with score and progress.
 * Shows test title, score percentage with progress bar, time taken, and completion date.
 * Provides buttons to review detailed results or retake the test.
 */
export function AttemptCard( { attempt }: AttemptCardProps ) {
  const { mutate: startAttempt, isPending } = useStartAttempt();

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-snug">
            {attempt.testTitle}
          </CardTitle>
          <Badge variant={attempt.isPassed ? "success" : "destructive"}>
            {attempt.percentage}% {attempt.isPassed ? "Passed" : "Failed"}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {CATEGORY_LABELS[attempt.testCategory]}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-3">
        {/* Display score and progress bar */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Score</span>
          <span className="font-semibold text-foreground">
            {attempt.pointsEarned}/{attempt.totalPoints}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              attempt.isPassed ? "bg-success" : "bg-destructive"
            }`}
            style={{ width: `${attempt.percentage}%` }}
          />
        </div>

        <div className="mt-1 flex justify-between items-center gap-4">
          <IconStat
            icon={<Clock className="h-3.5 w-3.5" />}
            value={formatDuration(attempt.timeTakenSeconds)}
          />
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(attempt.completedAt)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0">
        <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
          <Link
            to={PathConstants.TEST_RESULTS}
            params={{ id: attempt.id }}
            >
            <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
            Review
          </Link>
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => startAttempt(attempt.testId)} 
          disabled={isPending} 
        >
          <RotateCcw className={`mr-1.5 h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`} />
          {isPending ? "Starting..." : "Retake"}
        </Button>
      </CardFooter>
    </Card>
  )
}
