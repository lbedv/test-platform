import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, RotateCcw, ArrowRight } from "lucide-react"
import { IconStat } from "@/components/common"
import { ScoreBadge } from "./score-badge"
import type { Attempt } from "../types"
import { DEMO_TEST_ATTEMPT } from "@/data/shared-test-data"

interface AttemptCardProps {
  attempt: Attempt
}

export function AttemptCard({ attempt }: AttemptCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-snug">
            {attempt.testTitle}
          </CardTitle>
          <ScoreBadge percentage={attempt.percentage} passed={attempt.passed} />
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {attempt.testCategory}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Score</span>
          <span className="font-semibold text-foreground">
            {attempt.score}/{attempt.totalPoints}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              attempt.passed ? "bg-success" : "bg-destructive"
            }`}
            style={{ width: `${attempt.percentage}%` }}
          />
        </div>

        <div className="mt-1 flex gap-4">
          <IconStat
            icon={<Clock className="h-3.5 w-3.5" />}
            value={attempt.timeTaken}
          />
          <span className="text-xs text-muted-foreground">
            {attempt.completedAt}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0">
        <Button
          onClick={() => navigate({ to: PathConstants.TEST_RESULTS, params: { id: attempt.testId } })}
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent"
        >
          <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
          Review
        </Button>
        <Button
          onClick={() => navigate({ to: PathConstants.TEST_ATTEMPT, params: { id: DEMO_TEST_ATTEMPT.id } })}
          size="sm"
          className="flex-1"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          Retake
        </Button>
      </CardFooter>
    </Card>
  )
}
