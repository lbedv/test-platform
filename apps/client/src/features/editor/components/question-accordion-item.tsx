import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trash2, AlertCircle } from "lucide-react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { QUESTION_TYPES, type QuestionType } from "@test-platform/shared/constants"
import { QUESTION_TYPE_LABELS } from "@/shared/constants/labels"
import { useTestEditorStore } from "@/shared/store/test-editor-store"
import {
  MultipleChoiceAnswer,
  TrueFalseAnswer,
  TextInputAnswer,
  NumericAnswer,
} from "./answer-types"

interface QuestionAccordionItemProps {
  questionId: string
}

function ErrorMessage({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null
  return (
    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {errors[0]}
    </p>
  )
}

export function QuestionAccordionItem({ questionId }: QuestionAccordionItemProps) {
  const {
    test,
    updateQuestion,
    updateOption,
    addOption,
    deleteOption,
    deleteQuestion,
    getQuestionErrors,
  } = useTestEditorStore()

  const question = test.questions.find((q) => q.id === questionId)
  const questionErrors = getQuestionErrors(questionId)

  if (!question) return null

  const textErrors = questionErrors
    .filter((e) => e.field.includes('questionText'))
    .map((e) => e.message)
  const pointsErrors = questionErrors
    .filter((e) => e.field.includes('pointsPossible'))
    .map((e) => e.message)
  const optionsErrors = questionErrors
    .filter((e) => e.field.includes('options'))
    .map((e) => e.message)
  const answerErrors = questionErrors
    .filter((e) => e.field.includes('correctAnswer'))
    .map((e) => e.message)

  const hasErrors = questionErrors.length > 0

  const handleCorrectAnswerChange = (value: string | boolean | number | string[]) => {
    updateQuestion(question.id, { correctAnswer: value })
  }

  return (
    <AccordionItem key={question.id} value={question.id} className="border-border">
      <AccordionTrigger className="hover:no-underline hover:text-primary">
        <div className="flex items-center gap-3 flex-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold bg-primary/10 text-primary">
            {question.questionNumber}
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="text-left text-foreground">
              {question.questionText || "Untitled Question"}
            </span>
            <span className="text-xs text-muted-foreground">
              {question.pointsPossible} pts
            </span>
          </div>
          {hasErrors && (
            <div className="ml-auto pr-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent key={question.questionType}>
        <div className="space-y-6 border-t border-border pt-4">
          <div className="space-y-2">
            <Label htmlFor={`question-${question.id}`} className={textErrors.length > 0 ? "text-destructive" : "text-foreground"}>
              Question Text
            </Label>
            <Input
              id={`question-${question.id}`}
              placeholder="Enter your question"
              value={question.questionText}
              onChange={(e) =>
                updateQuestion(question.id, { questionText: e.target.value })
              }
              className={textErrors.length > 0 ? "border-destructive" : "border-input bg-background text-foreground"}
            />
            <ErrorMessage errors={textErrors} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`type-${question.id}`} className="text-foreground">
                Question Type
              </Label>
              <Select
                value={question.questionType}
                onValueChange={(value: QuestionType) =>
                  updateQuestion(question.id, { questionType: value })
                }
              >
                <SelectTrigger
                  id={`type-${question.id}`}
                  className="border-input bg-background text-foreground"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {QUESTION_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {QUESTION_TYPE_LABELS[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`points-${question.id}`} className={pointsErrors.length > 0 ? "text-destructive" : "text-foreground"}>
                Points
              </Label>
              <Input
                id={`points-${question.id}`}
                type="number"
                min={1}
                value={question.pointsPossible === 0 ? "" : question.pointsPossible}
                onChange={(e) =>
                  updateQuestion(question.id, {
                    pointsPossible: e.target.value ? Number(e.target.value) : 0,
                  })
                }
                className={pointsErrors.length > 0 ? "border-destructive" : "border-input bg-background text-foreground"}
              />
              <ErrorMessage errors={pointsErrors} />
            </div>
          </div>

          {/* Answer Options for Multiple Choice */}
          {question.questionType === "multipleChoice" && question.options && (
            <div className="space-y-4">
              <MultipleChoiceAnswer
                options={question.options}
                correctAnswer={
                  Array.isArray(question.correctAnswer) ? question.correctAnswer : []
                }
                onCorrectAnswerChange={handleCorrectAnswerChange}
                onOptionLabelChange={(optionId, label) =>
                  updateOption(question.id, optionId, label)
                }
                onAddOption={() => addOption(question.id)}
                onDeleteOption={(optionId) => deleteOption(question.id, optionId)}
              />
              {optionsErrors.length > 0 && (
                <ErrorMessage errors={optionsErrors} />
              )}
            </div>
          )}

          {/* True/False */}
          {question.questionType === "trueFalse" && (
            <TrueFalseAnswer
              correctAnswer={question.correctAnswer as boolean | undefined}
              questionId={question.id}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />
          )}

          {/* Text Input */}
          {question.questionType === "textInput" && (
            <TextInputAnswer
              correctAnswer={question.correctAnswer as string}
              questionId={question.id}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />
          )}

          {/* Numeric Answer */}
          {question.questionType === "numeric" && (
            <NumericAnswer
              correctAnswer={question.correctAnswer as number | string}
              questionId={question.id}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />
          )}

          {answerErrors.length > 0 && (
            <ErrorMessage errors={answerErrors} />
          )}

          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteQuestion(question.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Question
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
