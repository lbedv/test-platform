import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from "@/shared/constants/labels"
import { formatDuration } from "@/shared/lib/date"
import type { TestSummary } from "@test-platform/shared/schemas"
import {

  User,
  AlertTriangle,
} from "lucide-react"

interface TestActionsDialogProps {
  test: TestSummary | null
  isInfoDialogOpen: boolean
  isDeleteDialogOpen: boolean
  isStarting: boolean
  isDeleting: boolean
  onInfoDialogOpenChange: (open: boolean) => void
  onDeleteDialogOpenChange: (open: boolean) => void
  onStartTest: () => void
  onConfirmDelete: () => void
}

export function TestActionsDialog({
  test,
  isInfoDialogOpen,
  isDeleteDialogOpen,
  isStarting,
  isDeleting,
  onInfoDialogOpenChange,
  onDeleteDialogOpenChange,
  onStartTest,
  onConfirmDelete,
}: TestActionsDialogProps) {
  if (!test) return null;

  const isOwner = test.isMine;

  return (
    <>
      {/* Test Info Dialog */}
      <AlertDialog open={isInfoDialogOpen} onOpenChange={onInfoDialogOpenChange}>
        <AlertDialogContent className="max-w-lg p-0 overflow-hidden">
          {/* Header with gradient accent */}
          <div className="from-primary/10 via-primary/5 to-transparent p-6 pb-4">
            <AlertDialogHeader className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <AlertDialogTitle className="text-xl font-semibold leading-tight">
                  {test.testTitle}
                </AlertDialogTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default" className="font-medium">
                  {CATEGORY_LABELS[test.testCategory]}
                </Badge>
                <Badge 
                  variant="outline" 
                  className="font-medium"
                >
                  {DIFFICULTY_LABELS[test.testDifficulty]}
                </Badge>
              </div>
              {test.description && (
                <div className="max-w-full overflow-hidden">
                  <AlertDialogDescription className="text-sm leading-relaxed whitespace-normal wrap-break-word">
                    {test.description}
                  </AlertDialogDescription>
                </div>
              )}
            </AlertDialogHeader>
          </div>

          <div className="px-6 pb-6 space-y-5">
            {/* Author section */}
            {!isOwner && (
              <>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-center size-9 rounded-full bg-primary/10 text-primary">
                    <User className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Created by
                    </p>
                    <p className="text-sm font-medium">
                      {test.author.firstName} {test.author.lastName}
                    </p>
                  </div>
                </div>
                <Separator />
              </>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatItem
                label="Questions"
                value={test.questionsCount.toString()}
              />
              <StatItem
                label="Duration"
                value={formatDuration(test.timeLimitSeconds)}
              />
              <StatItem
                label="Total Points"
                value={test.totalPoints.toString()}
              />
              <StatItem
                label="Passing Score"
                value={`${test.passingPercentage}%`}
              />
              <StatItem
                label="Attempts"
                value={test.attemptsCount.toString()}
              />
              <StatItem
                label="Created"
                value={new Date(test.createdAt).toLocaleDateString()}
              />
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-1">
              <AlertDialogCancel className="px-4">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onStartTest}
                disabled={isStarting}
                className="gap-2 px-5"
              >
                {isStarting ? (
                  <>
                    <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    Start Test
                  </>
                )}
              </AlertDialogAction>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDeleteDialogOpenChange}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader className="space-y-4">
            <div className="mx-auto flex items-center justify-center size-12 rounded-full bg-destructive/10">
              <AlertTriangle className="size-6 text-destructive" />
            </div>
            <div className="text-center space-y-2">
              <AlertDialogTitle>Delete Test</AlertDialogTitle>
              <AlertDialogDescription className="text-balance">
                Are you sure you want to delete <span className="font-medium text-foreground">&quot;{test.testTitle}&quot;</span>? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-center pt-2">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              disabled={isDeleting}
              variant="destructive"
              className="flex-1 gap-2"
            >
              {isDeleting ? (
                <>
                  <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  Delete
                </>
              )}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

function StatItem({ 
  label, 
  value 
}: { 
  label: string
  value: string 
}) {
  return (
    <div className="text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-semibold ml-1">{value}</span>
    </div>
  )
}
