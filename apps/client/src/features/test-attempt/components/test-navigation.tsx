import { ChevronLeft, ChevronRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TestNavigationProps {
  currentIndex: number
  questionsCount: number
  goToPrevQuestion: () => void
  goToNextQuestion: () => void
  onSubmit: () => void
}

/**
 * TestNavigation component - Provides navigation controls for the test attempt interface.
 * Displays "Previous" and "Next" buttons to navigate between questions, and a "Submit Test" button on the last question.
 * Also shows the current question number and total question count for user reference.
 */
export function TestNavigation({
  currentIndex,
  questionsCount,
  goToPrevQuestion,
  goToNextQuestion,
  onSubmit,
}: TestNavigationProps) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === questionsCount - 1

  return (
    <div className="bg-card border-t border-border px-6 py-4">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goToPrevQuestion}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} of {questionsCount}
        </div>

        {isLast ? (
          <Button variant="secondary" onClick={onSubmit} className="gap-2">
            Submit Test
            <Send className="size-4" />
          </Button>
        ) : (
          <Button onClick={goToNextQuestion} className="gap-2">
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
