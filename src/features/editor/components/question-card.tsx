import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  GripVertical,
  CheckCircle2,
  CircleDot,
  ToggleLeft,
  Type,
  Hash,
  Trash2,
} from "lucide-react"
import type { Question, QuestionType } from "@/types/question"
import { QUESTION_TYPE_LABELS, createDefaultOptions } from "../editor-data"
import { QuestionOptionsEditor } from "./question-options-editor"
import { cn } from "@/lib/utils"

interface QuestionCardProps {
  question: Question
  index: number
  showPoints: boolean
  errors: Record<string, string>
  onUpdate: (question: Question) => void
  onRemove: () => void
}

const typeIcons: Record<QuestionType, React.ReactNode> = {
  "multiple-choice": <CircleDot className="h-3.5 w-3.5" />,
  "true-false": <ToggleLeft className="h-3.5 w-3.5" />,
  "text-input": <Type className="h-3.5 w-3.5" />,
  numeric: <Hash className="h-3.5 w-3.5" />,
}

export function QuestionCard({
  question,
  index,
  showPoints,
  errors,
  onUpdate,
  onRemove,
}: QuestionCardProps) {
  function updateField<K extends keyof Question>(
    field: K,
    value: Question[K]
  ) {
    onUpdate({ ...question, [field]: value })
  }

  function handleTypeChange(type: QuestionType) {
    onUpdate({
      ...question,
      type,
      options: createDefaultOptions(type),
      correctAnswer: "",
    })
  }

  const hasCorrectAnswer = question.options.some((opt) => opt.isCorrect)
  const questionPrefix = `Q${index + 1}`
  const errorKey = `question-${question.id}`

  return (
    <AccordionItem
      value={question.id}
      className="border rounded-lg bg-card overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
        <div className="flex flex-1 items-center gap-3 text-left">
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-primary/10 text-primary text-xs font-bold shrink-0">
            {questionPrefix}
          </span>
          <span className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-md">
            {question.text || "Untitled question"}
          </span>
          <div className="hidden sm:flex items-center gap-2 ml-auto mr-2">
            <Badge
              variant="outline"
              className="text-xs font-normal gap-1"
            >
              {typeIcons[question.type]}
              {QUESTION_TYPE_LABELS[question.type]}
            </Badge>
            {showPoints && question.points && (
              <Badge variant="outline" className="text-xs font-normal">
                {question.points} pt{question.points !== "1" ? "s" : ""}
              </Badge>
            )}
            {hasCorrectAnswer && (
              <Badge className="bg-success text-success-foreground text-xs gap-1 border-0">
                <CheckCircle2 className="h-3 w-3" />
                Answer set
              </Badge>
            )}
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-4 pb-4">
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <Label className="text-sm font-medium text-foreground">
                Question Type
              </Label>
              <Select
                value={question.type}
                onValueChange={(v) => handleTypeChange(v as QuestionType)}
              >
                <SelectTrigger aria-label="Select question type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(QUESTION_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showPoints && (
              <div className="flex flex-col gap-1.5 w-full sm:w-28">
                <Label
                  htmlFor={`points-${question.id}`}
                  className="text-sm font-medium text-foreground"
                >
                  Points
                </Label>
                <Input
                  id={`points-${question.id}`}
                  type="number"
                  min="0"
                  value={question.points}
                  onChange={(e) => updateField("points", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor={`qtext-${question.id}`}
              className="text-sm font-medium text-foreground"
            >
              Question Text <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id={`qtext-${question.id}`}
              placeholder="Enter your question..."
              rows={3}
              value={question.text}
              onChange={(e) => updateField("text", e.target.value)}
              className={cn(
                "resize-none",
                errors[`${errorKey}-text`] && "border-destructive focus:ring-destructive"
              )}
              aria-invalid={!!errors[`${errorKey}-text`]}
            />
            {errors[`${errorKey}-text`] && (
              <p className="text-xs text-destructive">
                {errors[`${errorKey}-text`]}
              </p>
            )}
          </div>

          <QuestionOptionsEditor
            question={question}
            errors={errors}
            errorKey={errorKey}
            onUpdate={onUpdate}
          />

          {question.type === "text-input" && (
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor={`answer-${question.id}`}
                className="text-sm font-medium text-foreground"
              >
                Correct Answer
              </Label>
              <Input
                id={`answer-${question.id}`}
                placeholder="Enter the expected answer..."
                value={question.correctAnswer}
                onChange={(e) => updateField("correctAnswer", e.target.value)}
              />
            </div>
          )}

          {question.type === "numeric" && (
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor={`answer-${question.id}`}
                className="text-sm font-medium text-foreground"
              >
                Correct Answer
              </Label>
              <Input
                id={`answer-${question.id}`}
                type="number"
                placeholder="Enter the correct number..."
                value={question.correctAnswer}
                onChange={(e) => updateField("correctAnswer", e.target.value)}
              />
            </div>
          )}

          <div className="flex justify-end pt-2 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={onRemove}
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Remove Question
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
