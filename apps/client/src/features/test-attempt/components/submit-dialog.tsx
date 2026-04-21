import { AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface SubmitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  skippedCount: number
  questionsCount: number
  isLoading: boolean
  isError: boolean
  onConfirmSubmit: () => void
}

/**
 * SubmitDialog component - Confirmation dialog for submitting the test attempt.
 * Displays a warning if there are unanswered questions, and a success message if all questions are answered.
 * Provides options to go back and review answers or to confirm submission.
 */
export function SubmitDialog({
  open,
  onOpenChange,
  skippedCount,
  questionsCount,
  isLoading,
  isError,
  onConfirmSubmit,
}: SubmitDialogProps) {
  const hasSkipped = skippedCount > 0

  // Dynamic configuration based on state
  const Icon = hasSkipped ? AlertTriangle : CheckCircle2
  const theme = hasSkipped 
    ? "bg-warning/10 border-warning/20 text-foreground"
    : "bg-success/10 border-success/20 text-foreground"
    
  const iconColor = hasSkipped ? "text-warning" : "text-success"

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Test</AlertDialogTitle>
          <AlertDialogDescription>
            Review your progress before submitting.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className={`rounded-lg border p-4 ${theme}`}>
          <div className="flex items-start gap-3">
            <Icon className={`size-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div>
              <h4 className="font-medium">
                {hasSkipped ? "Incomplete Submission" : "All Questions Answered"}
              </h4>
              <p className="text-sm opacity-90 mt-1">
                {hasSkipped
                  ? `You have ${skippedCount} unanswered ${skippedCount === 1 ? "question" : "questions"} out of ${questionsCount}. Are you sure you want to submit?`
                  : `Great job! You have answered all ${questionsCount} questions. Ready to submit?`}
              </p>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel 
            disabled={isLoading}
          >
            {hasSkipped ? "Go Back" : "Review Answers"}
          </AlertDialogCancel>
          
          <Button onClick={onConfirmSubmit} disabled={isLoading}>
            {isLoading && <RotateCcw className="mr-2 size-4 animate-spin" />}
            {isLoading 
              ? "Submitting..." 
              : hasSkipped 
                ? "Submit Anyway" 
                : "Submit Test"}
          </Button>
          {isError && (
            <p className="text-sm text-destructive mt-2">
              Failed to submit. Please try again.
            </p>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}