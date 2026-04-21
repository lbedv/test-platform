import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface TrueFalseAnswerProps {
  correctAnswer: boolean | undefined
  questionId: string
  onCorrectAnswerChange: (value: boolean) => void
}

export function TrueFalseAnswer({
  correctAnswer,
  questionId,
  onCorrectAnswerChange,
}: TrueFalseAnswerProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-accent/5 p-4">
      <Label className="text-foreground">Correct Answer</Label>
      <RadioGroup
        value={correctAnswer === undefined ? undefined : String(correctAnswer)}
        onValueChange={(value) => onCorrectAnswerChange(value === "true")}
        className="flex gap-6"
      >
        {["true", "false"].map((val) => (
          <div key={val} className="flex items-center gap-2">
            <RadioGroupItem value={val} id={`${val}-${questionId}`} />
            <Label
              htmlFor={`${val}-${questionId}`}
              className="font-normal text-foreground cursor-pointer"
            >
              <span className="capitalize">{val}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
