import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Option {
  id: string
  label: string
}

interface MultipleChoiceAnswerProps {
  options: Option[]
  correctAnswer: string[]
  onCorrectAnswerChange: (answers: string[]) => void
  onOptionLabelChange: (optionId: string, label: string) => void
  onAddOption: () => void
  onDeleteOption: (optionId: string) => void
}

export function MultipleChoiceAnswer({
  options,
  correctAnswer,
  onCorrectAnswerChange,
  onOptionLabelChange,
  onAddOption,
  onDeleteOption,
}: MultipleChoiceAnswerProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border bg-accent/5 p-4">
      <Label className="text-foreground">Answer Options (select all correct answers)</Label>
      <div className="space-y-3">
        {options.map((option, optIndex) => {
          const isChecked = correctAnswer.includes(option.id)
          return (
            <div key={option.id} className="flex items-center gap-3">
              <Checkbox
                id={`option-${option.id}`}
                checked={isChecked}
                onCheckedChange={() => {
                  const newAnswers = isChecked
                    ? correctAnswer.filter((id) => id !== option.id)
                    : [...correctAnswer, option.id]
                  onCorrectAnswerChange(newAnswers)
                }}
              />
              <Input
                placeholder={`Option ${optIndex + 1}`}
                value={option.label}
                onChange={(e) => onOptionLabelChange(option.id, e.target.value)}
                className="flex-1 border-input bg-background text-foreground"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteOption(option.id)}
                disabled={options.length <= 2}
                className="text-muted-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )
        })}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onAddOption}
        className="border-border text-primary hover:text-primary/95"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Option
      </Button>
    </div>
  )
}
