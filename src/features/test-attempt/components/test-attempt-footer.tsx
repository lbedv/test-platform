import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { QuestionNavigator } from "./question-navigator"
import { ChevronLeft, ChevronRight, SkipForward, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TestData } from "../types"

interface TestTakeFooterProps {
  test: TestData
  currentIndex: number
  answeredIndices: Set<number>
  skippedIndices: Set<number>
  isFirst: boolean
  isLast: boolean
  onNavigate: (index: number) => void
  onPrev: () => void
  onNext: () => void
  onSkip: () => void
  onFinish: () => void
}

export function TestAttemptFooter({
  test,
  currentIndex,
  answeredIndices,
  skippedIndices,
  isFirst,
  isLast,
  onNavigate,
  onPrev,
  onNext,
  onSkip,
  onFinish,
}: TestTakeFooterProps) {
  return (
    <footer className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:px-6">
        <QuestionNavigator
          totalQuestions={test.totalQuestions}
          currentIndex={currentIndex}
          answeredIndices={answeredIndices}
          skippedIndices={skippedIndices}
          onNavigate={onNavigate}
        />
        <Separator />
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={isFirst}
            className="gap-1.5"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={onSkip}
              disabled={isLast && answeredIndices.has(currentIndex)}
              className={cn(
                "gap-1.5 text-muted-foreground",
                "hover:text-warning hover:bg-warning/10"
              )}
            >
              <SkipForward className="h-4 w-4" />
              <span className="hidden sm:inline">Skip</span>
            </Button>
            {isLast ? (
              <Button
                variant="secondary"
                onClick={onFinish}
                className="gap-1.5"
              >
                <Flag className="h-4 w-4" />
                Finish
              </Button>
            ) : (
              <Button
                onClick={onNext}
                className="gap-1.5"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
