import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface FinishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  totalQuestions: number
  answeredCount: number
  skippedCount: number
}

export function FinishDialog({
  open,
  onOpenChange,
  onConfirm,
  totalQuestions,
  answeredCount,
  skippedCount,
}: FinishDialogProps) {
  const unanswered = totalQuestions - answeredCount

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Test?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-3">
              <p>Are you sure you want to submit your test? This action cannot be undone.</p>
              <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-muted/50 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Answered</span>
                  <span className="font-medium text-foreground">
                    {answeredCount} of {totalQuestions}
                  </span>
                </div>
                {unanswered > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Unanswered</span>
                    <span className="font-medium text-warning">
                      {unanswered}
                    </span>
                  </div>
                )}
                {skippedCount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Skipped</span>
                    <span className="font-medium text-warning">
                      {skippedCount}
                    </span>
                  </div>
                )}
              </div>
              {unanswered > 0 && (
                <p className="text-xs text-warning">
                  You have {unanswered} unanswered{" "}
                  {unanswered === 1 ? "question" : "questions"}. Unanswered
                  questions will be marked as incorrect.
                </p>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Submit Test
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
