import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AnswerDisplay } from "./answer-display"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { QUESTION_TYPE_LABELS } from "@/data/shared-test-data"
import type { QuestionResult } from "../types"

interface QuestionBreakdownItemProps {
  question: QuestionResult
  isExpanded: boolean
  isFirst: boolean
  onToggle: () => void
}

export function QuestionBreakdownItem({
  question: q,
  isExpanded,
  isFirst,
  onToggle,
}: QuestionBreakdownItemProps) {
  const isUnanswered = q.userAnswer === "No answer"

  return (
    <div>
      {!isFirst && <Separator />}
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center gap-3 px-6 py-4 text-left transition-colors",
          "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        )}
        aria-expanded={isExpanded}
        aria-label={`Question ${q.questionNumber}: ${q.isCorrect ? "Correct" : "Incorrect"}`}
      >
        {/* Status icon */}
        <div className="shrink-0">
          {isUnanswered ? (
            <MinusCircle className="h-5 w-5 text-warning" />
          ) : q.isCorrect ? (
            <CheckCircle2 className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-destructive" />
          )}
        </div>

        {/* Question number + text */}
        <div className="flex flex-1 flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">
              Q{q.questionNumber}
            </span>
            <Badge
              variant="outline"
              className="hidden text-[10px] px-1.5 py-0 h-4 sm:inline-flex"
            >
              {QUESTION_TYPE_LABELS[q.questionType]}
            </Badge>
          </div>
          <span className="truncate text-sm text-muted-foreground">
            {q.questionText}
          </span>
        </div>

        {/* Points */}
        <div className="hidden shrink-0 sm:flex items-center gap-1.5">
          <span
            className={cn(
              "text-sm font-semibold",
              q.isCorrect ? "text-success" : "text-muted-foreground"
            )}
          >
            {q.pointsEarned}/{q.pointsPossible}
          </span>
          <span className="text-xs text-muted-foreground">pts</span>
        </div>

        {/* Expand arrow */}
        <div className="shrink-0 text-muted-foreground">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/30 px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:gap-8">
            <AnswerDisplay
              label="Your Answer"
              answer={q.userAnswer}
              type="user"
              isCorrect={q.isCorrect}
              isUnanswered={isUnanswered}
            />

            <AnswerDisplay
              label="Correct Answer"
              answer={q.correctAnswer}
              type="correct"
            />

            {/* Points on mobile */}
            <div className="flex items-center gap-1.5 sm:hidden">
              <span className="text-xs text-muted-foreground">
                Points:
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  q.isCorrect
                    ? "text-success"
                    : "text-muted-foreground"
                )}
              >
                {q.pointsEarned}/{q.pointsPossible}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
