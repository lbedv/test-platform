import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, MinusCircle, Clock, Trophy } from "lucide-react"
import type { TestResult } from "../types"

interface ScoreCardProps {
  result: TestResult
}

export function ScoreCard({ result }: ScoreCardProps) {
  const isPassing = result.percentage >= 70
  const isExcellent = result.percentage >= 90

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs.toString().padStart(2, "0")}s`
  }

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col items-center gap-6 p-6 md:p-8">
        {/* Score circle */}
        <div className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "flex h-28 w-28 flex-col items-center justify-center rounded-full border-4 md:h-32 md:w-32",
              isExcellent
                ? "border-success bg-success/10"
                : isPassing
                  ? "border-primary bg-primary/10"
                  : "border-destructive bg-destructive/10"
            )}
          >
            <span
              className={cn(
                "text-3xl font-bold md:text-4xl",
                isExcellent
                  ? "text-success"
                  : isPassing
                    ? "text-primary"
                    : "text-destructive"
              )}
            >
              {result.percentage}%
            </span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>

          <div className="flex items-center gap-2">
            <Trophy
              className={cn(
                "h-4 w-4",
                isExcellent
                  ? "text-success"
                  : isPassing
                    ? "text-primary"
                    : "text-muted-foreground"
              )}
            />
            <span className="text-sm font-medium text-foreground">
              {result.earnedPoints} / {result.totalPoints} points
            </span>
          </div>

          <Badge
            className={cn(
              "border-transparent",
              isExcellent
                ? "bg-success/15 text-success"
                : isPassing
                  ? "bg-primary/15 text-primary"
                  : "bg-destructive/15 text-destructive"
            )}
          >
            {isExcellent ? "Excellent" : isPassing ? "Passed" : "Needs Improvement"}
          </Badge>
        </div>

        <Separator />

        {/* Stats row */}
        <div className="flex w-full flex-wrap items-center justify-center gap-6 md:gap-10">
          <StatItem
            icon={<CheckCircle2 className="h-4 w-4 text-success" />}
            label="Correct"
            value={result.correctCount}
          />
          <StatItem
            icon={<XCircle className="h-4 w-4 text-destructive" />}
            label="Incorrect"
            value={result.incorrectCount}
          />
          {result.unansweredCount > 0 && (
            <StatItem
              icon={<MinusCircle className="h-4 w-4 text-warning" />}
              label="Unanswered"
              value={result.unansweredCount}
            />
          )}
          {result.timeTaken !== null && (
            <StatItem
              icon={<Clock className="h-4 w-4 text-muted-foreground" />}
              label="Time Taken"
              value={formatTime(result.timeTaken)}
            />
          )}
        </div>

        {/* Test info */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="outline" className="text-xs">
            {result.testCategory}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {result.testDifficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {result.totalQuestions} questions
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-lg font-semibold text-foreground">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}
