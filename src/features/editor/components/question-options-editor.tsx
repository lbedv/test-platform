import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, Trash2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Question, QuestionOption } from "@/types/question"

interface QuestionOptionsEditorProps {
  question: Question
  errors: Record<string, string>
  errorKey: string
  onUpdate: (question: Question) => void
}

export function QuestionOptionsEditor({
  question,
  errors,
  errorKey,
  onUpdate,
}: QuestionOptionsEditorProps) {
  function updateField<K extends keyof Question>(
    field: K,
    value: Question[K]
  ) {
    onUpdate({ ...question, [field]: value })
  }

  function updateOption(optionId: string, text: string) {
    const updated = question.options.map((opt) =>
      opt.id === optionId ? { ...opt, text } : opt
    )
    updateField("options", updated)
  }

  function markCorrect(optionId: string) {
    const updated = question.options.map((opt) => ({
      ...opt,
      isCorrect: opt.id === optionId,
    }))
    updateField("options", updated)
  }

  function addOption() {
    const newOption: QuestionOption = {
      id: crypto.randomUUID(),
      text: "",
      isCorrect: false,
    }
    updateField("options", [...question.options, newOption])
  }

  function removeOption(optionId: string) {
    if (question.options.length <= 2) return
    updateField(
      "options",
      question.options.filter((opt) => opt.id !== optionId)
    )
  }

  if (question.type !== "multiple-choice" && question.type !== "true-false") {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      <Label className="text-sm font-medium text-foreground">
        Answer Options
      </Label>
      {errors[`${errorKey}-correct`] && (
        <p className="text-xs text-destructive">
          {errors[`${errorKey}-correct`]}
        </p>
      )}
      <RadioGroup
        value={question.options.find((o) => o.isCorrect)?.id ?? ""}
        onValueChange={(id) => markCorrect(id)}
        className="flex flex-col gap-2"
      >
        {question.options.map((option, optIdx) => (
          <div
            key={option.id}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors",
              option.isCorrect
                ? "border-success/50 bg-success/5"
                : "border-border bg-background"
            )}
          >
            <RadioGroupItem
              value={option.id}
              id={`opt-${option.id}`}
              aria-label={`Mark option ${optIdx + 1} as correct`}
              className={cn(
                option.isCorrect && "border-success text-success"
              )}
            />
            {option.isCorrect && (
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            )}
            {question.type === "true-false" ? (
              <Label
                htmlFor={`opt-${option.id}`}
                className="flex-1 text-sm cursor-pointer text-foreground"
              >
                {option.text}
              </Label>
            ) : (
              <Input
                value={option.text}
                onChange={(e) => updateOption(option.id, e.target.value)}
                placeholder={`Option ${optIdx + 1}`}
                className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 h-auto text-foreground"
                aria-label={`Option ${optIdx + 1} text`}
              />
            )}
            {question.type === "multiple-choice" &&
              question.options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => removeOption(option.id)}
                  aria-label={`Remove option ${optIdx + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
          </div>
        ))}
      </RadioGroup>

      {question.type === "multiple-choice" &&
        question.options.length < 6 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit text-muted-foreground hover:text-foreground"
            onClick={addOption}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add Option
          </Button>
        )}
    </div>
  )
}
