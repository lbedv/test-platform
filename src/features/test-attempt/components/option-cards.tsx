import type { Question, QuestionOption } from "@/types/question"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface OptionCardsProps {
  options: Question["options"]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function OptionCards({
  options,
  selectedId,
  onSelect,
}: OptionCardsProps) {
  return (
    <div
      className="flex flex-col gap-3"
      role="radiogroup"
      aria-label="Answer options"
    >
      {options.map((option: QuestionOption, idx: number) => {
        const isSelected = selectedId === option.id
        const letter = String.fromCharCode(65 + idx) // A, B, C, D...

        return (
          <Card
            key={option.id}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            aria-label={`Option ${letter}: ${option.text}`}
            onClick={() => onSelect(option.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect(option.id)
              }
            }}
            className={cn(
              "cursor-pointer transition-all",
              "hover:border-primary/50 hover:shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isSelected
                ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                : "border-border bg-card"
            )}
          >
            <CardContent className="flex items-center gap-4 p-4">
              {/* Letter indicator */}
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {letter}
              </div>

              {/* Option text */}
              <span
                className={cn(
                  "flex-1 text-base leading-relaxed",
                  isSelected ? "text-foreground font-medium" : "text-foreground"
                )}
              >
                {option.text}
              </span>

              {/* Selected checkmark */}
              {isSelected && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
