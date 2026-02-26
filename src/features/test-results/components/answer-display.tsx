import { cn } from "@/lib/utils"

interface AnswerDisplayProps {
  label: string
  answer: string
  type: "user" | "correct"
  isCorrect?: boolean
  isUnanswered?: boolean
}

export function AnswerDisplay({
  label,
  answer,
  type,
  isCorrect = false,
  isUnanswered = false,
}: AnswerDisplayProps) {
  let colorClasses = "border-success/30 bg-success/5 text-success"

  if (type === "user") {
    if (isUnanswered) {
      colorClasses = "border-warning/30 bg-warning/5 text-warning"
    } else if (!isCorrect) {
      colorClasses = "border-destructive/30 bg-destructive/5 text-destructive"
    }
  }

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "rounded-lg border px-4 py-3 text-sm",
          colorClasses
        )}
      >
        {answer}
      </div>
    </div>
  )
}
