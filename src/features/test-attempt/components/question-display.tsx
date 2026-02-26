import type { Question } from "@/types/question"
import type { TestAnswer } from "../types"
import { Badge } from "@/components/ui/badge"
import { OptionCards } from "./option-cards"
import { InputAnswer } from "./input-answer"

interface QuestionDisplayProps {
  question: Question
  questionNumber: number
  totalQuestions: number
  answer: TestAnswer
  onAnswerChange: (answer: TestAnswer) => void
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  answer,
  onAnswerChange,
}: QuestionDisplayProps) {
  function handleOptionSelect(optionId: string) {
    onAnswerChange({
      ...answer,
      selectedOptionId: optionId,
    })
  }

  const typeLabel =
    question.type === "multiple-choice"
      ? "Multiple Choice"
      : question.type === "true-false"
        ? "True / False"
        : question.type === "text-input"
          ? "Written Answer"
          : "Numeric Answer"

  return (
    <div className="flex flex-col items-center gap-8 px-4">
      {/* Question metadata */}
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="text-xs">
          Question {questionNumber} of {totalQuestions}
        </Badge>
        <Badge
          variant="secondary"
          className="text-xs bg-secondary/15 text-secondary border-transparent"
        >
          {typeLabel}
        </Badge>
      </div>

      {/* Question text -- large and centered */}
      <h2 className="max-w-2xl text-center text-xl font-semibold leading-relaxed text-foreground md:text-2xl text-balance">
        {question.text}
      </h2>

      {/* Answer area */}
      <div className="w-full max-w-xl">
        {(question.type === "multiple-choice" ||
          question.type === "true-false") && (
          <OptionCards
            options={question.options}
            selectedId={answer.selectedOptionId}
            onSelect={handleOptionSelect}
          />
        )}

        {question.type === "text-input" && (
          <InputAnswer
            questionId={question.id}
            value={answer.textAnswer}
            onAnswerChange={onAnswerChange}
            currentAnswer={answer}
            type="text"
          />
        )}

        {question.type === "numeric" && (
          <InputAnswer
            questionId={question.id}
            value={answer.textAnswer}
            onAnswerChange={onAnswerChange}
            currentAnswer={answer}
            type="number"
          />
        )}
      </div>
    </div>
  )
}
