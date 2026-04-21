import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TextInputAnswerProps {
  correctAnswer: string
  questionId: string
  onCorrectAnswerChange: (value: string) => void
}

export function TextInputAnswer({
  correctAnswer,
  questionId,
  onCorrectAnswerChange,
}: TextInputAnswerProps) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-accent/5 p-4">
      <Label htmlFor={`text-answer-${questionId}`} className="text-foreground">
        Expected Answer (for grading reference)
      </Label>
      <Textarea
        id={`text-answer-${questionId}`}
        placeholder="Enter the expected answer"
        value={correctAnswer}
        onChange={(e) => onCorrectAnswerChange(e.target.value)}
        rows={3}
        className="resize-none border-input bg-background text-foreground"
      />
    </div>
  )
}
