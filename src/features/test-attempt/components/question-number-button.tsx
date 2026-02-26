import { cn } from "@/lib/utils"

interface QuestionNumberButtonProps {
  number: number
  isCurrent: boolean
  isAnswered: boolean
  isSkipped: boolean
  onNavigate: () => void
}

export function QuestionNumberButton({
  number,
  isCurrent,
  isAnswered,
  isSkipped,
  onNavigate,
}: QuestionNumberButtonProps) {
  return (
    <button
      onClick={onNavigate}
      aria-label={`Go to question ${number}${isCurrent ? " (current)" : ""}${isAnswered ? " (answered)" : ""}${isSkipped ? " (skipped)" : ""}`}
      aria-current={isCurrent ? "step" : undefined}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isCurrent
          ? "bg-primary text-primary-foreground shadow-sm"
          : isAnswered
            ? "bg-primary/15 text-primary border border-primary/30"
            : isSkipped
              ? "bg-warning/15 text-warning border border-warning/30"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
      )}
    >
      {number}
    </button>
  )
}
