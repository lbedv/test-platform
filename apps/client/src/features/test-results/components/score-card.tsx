import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/shared/lib/utils"
import { CheckCircle2, XCircle, MinusCircle, Clock, Trophy } from "lucide-react"
import { formatDuration } from "@/shared/lib/date"
import { SCORE_STYLE_MAP } from "../constants"
import type { ScoreStatus } from "../types"
import type { AttemptResultsResponse } from "@test-platform/shared/schemas"
import { countAnswerOutcomes } from "../utils/answer-utils"
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/shared/constants/labels';

interface ScoreCardProps {
  results: AttemptResultsResponse
}

/**
 * ScoreCard component - Displays a summary of the test results, including final score, percentage, and detailed stats.
 * Shows a badge indicating pass/fail/excellent status, and breakdown of correct/incorrect/skipped answers.
 * Also includes metadata about the test such as category, difficulty, question count, and time limit.
 */
export function ScoreCard({ results }: ScoreCardProps) {
  const {
    questions,
    testCategory,
    testDifficulty,
    pointsEarned,
    totalPoints,
    percentage,
    timeTakenSeconds,
    isPassed,
  } = results;
  const counts = countAnswerOutcomes(questions)

  // Determine the status once
  const isExcellent = pointsEarned === totalPoints
  const status: ScoreStatus = isExcellent ? "excellent" : isPassed ? "passed" : "failed"
  const scoreStyle = SCORE_STYLE_MAP[status]

  return (
    <Card className="border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="flex flex-col md:flex-row items-stretch gap-0 p-0">
        
        {/* Left Section: Core Score & Status */}
        <div className="flex flex-col p-5 md:p-6 gap-4 md:border-r border-border md:w-60 shrink-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <Badge variant="secondary" className={cn("border-transparent font-semibold text-sm py-1 px-3 whitespace-normal wrap-break-word", scoreStyle.badge)}>
              {scoreStyle.label}
            </Badge>
            <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Trophy className={cn("h-4 w-4", scoreStyle.text)} />
              <span>
                {pointsEarned} / {totalPoints} <span className="text-muted-foreground font-normal">points</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col grow justify-center">
            <span className={cn("text-6xl font-extrabold tracking-tighter leading-none", scoreStyle.text)}>
              {percentage}%
            </span>
            <span className="text-sm font-medium text-muted-foreground mt-2">Final Test Score</span>
          </div>
        </div>

        <Separator orientation="horizontal" className="md:hidden" />

        {/* Right Section: Detailed Stats & Test Info */}
        <div className="flex flex-col p-5 md:p-6 flex-1 gap-5 justify-center">
          
          {/* Answer breakdown statistics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 items-start gap-x-6 gap-y-6">
            <DetailedStatItem
              icon={<CheckCircle2 className="h-6 w-6 text-success" />}
              label="Correct"
              value={counts.correct}
            />
            <DetailedStatItem
              icon={<XCircle className="h-6 w-6 text-destructive" />}
              label="Incorrect"
              value={counts.incorrect}
            />
            <DetailedStatItem
              icon={<MinusCircle className="h-6 w-6 text-warning" />}
              label="Unanswered"
              value={counts.skipped}
            />
            <DetailedStatItem
              icon={<Clock className="h-6 w-6 text-muted-foreground" />}
              label="Time Taken"
              value={formatDuration(timeTakenSeconds)}
            />
          </div>

          <Separator className="mt-1" />

          {/* Test metadata info */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-muted/30">
              {CATEGORY_LABELS[testCategory]}
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-muted/30">
              {DIFFICULTY_LABELS[testDifficulty]}
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-muted/30">
              {questions.length} questions
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-muted/30">
              {formatDuration(results.timeLimitSeconds)}
            </Badge>
            <Badge variant="outline" className="text-xs text-muted-foreground border-border bg-muted/30">
              {results.passingPercentage}% to pass
            </Badge>
          </div>
        </div>
        
      </CardContent>
    </Card>
  )
}

function DetailedStatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-row md:flex-col items-center md:justify-center gap-3 md:gap-4">
      <div className="shrink-0">
        {icon}
      </div>
      <div className="flex flex-col items-start md:items-center gap-2.5">
        <span className="text-2xl font-bold text-foreground leading-none text-center">{value}</span>
        <span className="text-sm text-muted-foreground leading-none text-center">{label}</span>
      </div>
    </div>
  )
}