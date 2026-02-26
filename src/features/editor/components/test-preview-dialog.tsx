import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { TestSettings } from "../types"
import type { Question } from "@/types/question"
import { QUESTION_TYPE_LABELS } from "../editor-data"
import {
  Clock,
  RotateCcw,
  Shuffle,
  Award,
  CheckCircle2,
} from "lucide-react"

interface TestPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  settings: TestSettings
  questions: Question[]
}

export function TestPreviewDialog({
  open,
  onOpenChange,
  settings,
  questions,
}: TestPreviewDialogProps) {
  const totalPoints = questions.reduce(
    (sum, q) => sum + (parseInt(q.points) || 0),
    0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {settings.title || "Untitled Test"}
          </DialogTitle>
          {settings.description && (
            <DialogDescription className="text-muted-foreground">
              {settings.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          {settings.category && (
            <Badge variant="outline" className="text-xs">
              {settings.category}
            </Badge>
          )}
          {settings.difficulty && (
            <Badge variant="outline" className="text-xs capitalize">
              {settings.difficulty}
            </Badge>
          )}
          {settings.timeLimit && (
            <Badge variant="outline" className="text-xs gap-1">
              <Clock className="h-3 w-3" />
              {settings.timeLimit} min
            </Badge>
          )}
          {settings.maxAttempts && (
            <Badge variant="outline" className="text-xs gap-1">
              <RotateCcw className="h-3 w-3" />
              {settings.maxAttempts} attempts
            </Badge>
          )}
          {settings.randomOrder && (
            <Badge variant="outline" className="text-xs gap-1">
              <Shuffle className="h-3 w-3" />
              Randomized
            </Badge>
          )}
          {settings.pointsSystem && (
            <Badge variant="outline" className="text-xs gap-1">
              <Award className="h-3 w-3" />
              {totalPoints} total pts
            </Badge>
          )}
        </div>

        <Separator className="my-2" />

        {questions.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No questions added yet.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {questions.map((q, idx) => (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {q.text || "Untitled question"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {QUESTION_TYPE_LABELS[q.type]}
                      {settings.pointsSystem && q.points
                        ? ` - ${q.points} pt${q.points !== "1" ? "s" : ""}`
                        : ""}
                    </p>
                  </div>
                </div>
                {(q.type === "multiple-choice" || q.type === "true-false") && (
                  <div className="ml-8 flex flex-col gap-1">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 rounded px-2.5 py-1.5 text-sm ${
                          opt.isCorrect
                            ? "bg-success/10 text-success font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {opt.isCorrect && (
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        )}
                        <span className={opt.isCorrect ? "" : "ml-5"}>
                          {String.fromCharCode(65 + optIdx)}.{" "}
                          {opt.text || `Option ${optIdx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {(q.type === "text-input" || q.type === "numeric") &&
                  q.correctAnswer && (
                    <div className="ml-8">
                      <span className="inline-flex items-center gap-1.5 rounded bg-success/10 px-2.5 py-1.5 text-sm text-success font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Answer: {q.correctAnswer}
                      </span>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
