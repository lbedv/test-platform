import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { QuestionCard } from "./question-card"
import type { Question } from "@/types/question"
import { createDefaultQuestion } from "../editor-data";
import { PlusCircle, FileQuestion } from "lucide-react"

interface QuestionsPanelProps {
  questions: Question[]
  showPoints: boolean
  errors: Record<string, string>
  onQuestionsChange: (questions: Question[]) => void
  disabled?: boolean
}

export function QuestionsPanel({
  questions,
  showPoints,
  errors,
  onQuestionsChange,
  disabled = false,
}: QuestionsPanelProps) {
  function addQuestion() {
    onQuestionsChange([...questions, createDefaultQuestion()])
  }

  function updateQuestion(index: number, updated: Question) {
    const copy = [...questions]
    copy[index] = updated
    onQuestionsChange(copy)
  }

  function removeQuestion(index: number) {
    onQuestionsChange(questions.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Questions</h2>
        <Button
          type="button"
          onClick={addQuestion}
          disabled={disabled}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          size="sm"
        >
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-16 px-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">
            No questions yet
          </p>
          <p className="text-xs text-muted-foreground text-center mb-4">
            Click the button above to add your first question.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addQuestion}
            disabled={disabled}
          >
            <PlusCircle className="h-4 w-4 mr-1.5" />
            Add First Question
          </Button>
        </div>
      ) : (
        <Accordion
          type="multiple"
          defaultValue={questions.length > 0 ? [questions[0].id] : []}
          className="flex flex-col gap-3"
        >
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              showPoints={showPoints}
              errors={errors}
              onUpdate={(updated) => updateQuestion(index, updated)}
              onRemove={() => removeQuestion(index)}
            />
          ))}
        </Accordion>
      )}

      {questions.length > 0 && (
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed text-muted-foreground hover:text-foreground hover:border-primary/50"
          onClick={addQuestion}
          disabled={disabled}
        >
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Add Another Question
        </Button>
      )}
    </div>
  )
}
