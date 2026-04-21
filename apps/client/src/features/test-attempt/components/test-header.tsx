import { cn } from "@/shared/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock } from "lucide-react"
import type { Category, Difficulty } from "@test-platform/shared/constants"
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '@/shared/constants/labels';
import { formatDuration } from "@/shared/lib/date"

interface TestHeaderProps {
  testTitle: string
  testCategory: Category
  testDifficulty: Difficulty
  questionsCount: number
  answeredCount: number
  timeRemaining: number
}

/**
 * TestHeader component - Sticky header during test attempt.
 * Displays test title, category, difficulty, progress bar, answered count, and timer.
 */
export function TestHeader({
  testTitle,
  testCategory,
  testDifficulty,
  answeredCount,
  questionsCount,
  timeRemaining,
}: TestHeaderProps) {
  const progressPercent = (answeredCount / questionsCount) * 100
  const isCritical = timeRemaining <= 30

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
                {testTitle}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-5"
                >
                  {CATEGORY_LABELS[testCategory]}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {DIFFICULTY_LABELS[testDifficulty]}
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
                /{questionsCount} answered
              </span>
            </div>
              <Clock
                className={cn(
                  "h-4 w-4",
                  isCritical
                    ? "text-destructive"
                    : "text-muted-foreground"
                )}
              />
              <span>
                {formatDuration(timeRemaining, true)}
              </span>
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
