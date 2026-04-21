import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface NumericAnswerProps {
  correctAnswer: number | string
  questionId: string
  onCorrectAnswerChange: (value: number | string) => void
}

export function NumericAnswer({
  correctAnswer,
  questionId,
  onCorrectAnswerChange,
}: NumericAnswerProps) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-accent/5 p-4">
      <Label htmlFor={`numeric-answer-${questionId}`} className="text-foreground">
        Correct Numeric Answer
      </Label>
      <Input
        id={`numeric-answer-${questionId}`}
        type="number"
        placeholder="Enter the correct number"
        value={correctAnswer}
        onChange={(e) =>
          onCorrectAnswerChange(
            e.target.value === "" ? "" : Number(e.target.value)
          )
        }
        className="border-input bg-background text-foreground"
      />
    </div>
  )
}
