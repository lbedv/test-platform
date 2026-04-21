import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/shared/lib/utils"
import type { GridQuestion } from "../types"

interface QuestionGridProps {
  currentIndex: number
  currentBlockIndex: number
  blocksCount: number
  currentGridQuestions: GridQuestion[]
  onSelectQuestion: (index: number) => void
  goToNextBlock: () => void
  goToPrevBlock: () => void
  isAnswered: (id: string) => boolean
}

/**
 * QuestionGrid component - Displays a grid of question numbers for the current block of questions in the test attempt interface.
 * Allows users to navigate between questions within the current block, and also navigate to the next or previous block of questions.
 * Each question number is styled to indicate whether it has been answered or not, and the current question is highlighted.
 */
export function QuestionGrid({
  currentIndex,
  currentBlockIndex,
  blocksCount,
  currentGridQuestions,
  onSelectQuestion,
  goToNextBlock,
  goToPrevBlock,
  isAnswered,
}: QuestionGridProps) {
  const canGoPrevBlock = currentBlockIndex > 0;
  const canGoNextBlock = currentBlockIndex < blocksCount - 1;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={goToPrevBlock}
          disabled={!canGoPrevBlock}
        >
          <ChevronLeft className="size-4" />
          <span className="sr-only">Previous questions</span>
        </Button>
        
        <div className="flex items-center justify-center gap-2">
          {currentGridQuestions.map((question) => {
            const answered = isAnswered(question.id)
            const isCurrent = question.originalIndex === currentIndex

            return (
              <Button
                key={question.id}
                variant={isCurrent ? "default" : "outline"}
                size="sm"
                className={cn(
                  "size-9 p-0 font-medium",
                  !isCurrent && answered && "bg-primary/10 border-primary/50 text-primary hover:bg-primary/20",
                  !isCurrent && !answered && "text-muted-foreground"
                )}
                onClick={() => onSelectQuestion(question.originalIndex)}
              >
                {question.originalIndex + 1}
              </Button>
            )
          })}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={goToNextBlock}
          disabled={!canGoNextBlock}
        >
          <ChevronRight className="size-4" />
          <span className="sr-only">Next questions</span>
        </Button>
      </div>
      
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-sm bg-primary/10 border border-primary/50" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded-sm border border-border" />
          <span>Unanswered</span>
        </div>
        {blocksCount > 1 && (
          <span className="text-muted-foreground">
            Block {currentBlockIndex + 1} of {blocksCount}
          </span>
        )}
      </div>
    </div>
  )
}
