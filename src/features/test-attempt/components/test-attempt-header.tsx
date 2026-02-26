import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TestTimer } from "./test-timer"
import { FileText } from "lucide-react"
import type { TestData } from "../types"

interface TestTakeHeaderProps {
  test: TestData
  answeredCount: number
  timeRemaining: number
  onTimeUp: () => void
  onTick: () => void
  progressPercent: number
}

export function TestAttemptHeader({
  test,
  answeredCount,
  timeRemaining,
  onTimeUp,
  onTick,
  progressPercent,
}: TestTakeHeaderProps) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
                {test.title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-5"
                >
                  {test.category}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {test.difficulty}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span>
                <span className="font-semibold text-foreground">
                  {answeredCount}
                </span>
                /{test.totalQuestions} answered
              </span>
            </div>
            {test.timeLimit && (
              <TestTimer
                timeRemaining={timeRemaining}
                totalTime={test.timeLimit}
                onTimeUp={onTimeUp}
                onTick={onTick}
              />
            )}
          </div>
        </div>
        <Progress
          value={progressPercent}
          className="h-1 rounded-none bg-muted"
        />
      </header>
    </>
  )
}
