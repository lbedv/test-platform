import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrueFalseInput, MultipleChoiceInput, NumericInput, TextInput } from "./question-inputs";
import { QUESTION_TYPE_LABELS } from '@/shared/constants/labels';
import type { QuestionType } from "@test-platform/shared/constants";
import type { QuestionWithUserAnswer } from "@test-platform/shared/schemas";
import type { Answer, AnswerMap } from "../types";

function getTypedAnswer<T extends QuestionType>(
  rawValue: Answer["userAnswer"]
): AnswerMap[T] | undefined {
  return rawValue as AnswerMap[T] | undefined;
}

interface ActiveQuestionRendererProps {
  currentQuestion: QuestionWithUserAnswer
  currentIndex: number
  questionsCount: number
  currentAnswer: Answer["userAnswer"]
  setAnswer: (answer: Answer) => void
}

/**
 * ActiveQuestionRenderer component - Renders the current question and its input field based on its type.
 * Manages the state of the user's answer for the current question and updates it as the user interacts with the input.
 */
export function ActiveQuestionRenderer({
  currentQuestion,
  currentIndex,
  questionsCount,
  currentAnswer,
  setAnswer,
}: ActiveQuestionRendererProps) {
  const questionNumber = currentIndex + 1;

  const renderInput = () => {
    const type = currentQuestion.questionType

    switch (type) {
      case "trueFalse":
        return (
          <TrueFalseInput
            value={getTypedAnswer<"trueFalse">(currentAnswer)}
            onChange={(val) =>
              setAnswer({ id: currentQuestion.id, userAnswer: val })
            }
          />
        )

      case "multipleChoice":
        return (
          <MultipleChoiceInput
            options={currentQuestion.options ?? []}
            value={getTypedAnswer<"multipleChoice">(currentAnswer) ?? []}
            onChange={(val) =>
              setAnswer({ id: currentQuestion.id, userAnswer: val })
            }
          />
        )

      case "numeric":
        return (
          <NumericInput
            value={getTypedAnswer<"numeric">(currentAnswer)}
            onChange={(val) =>
              setAnswer({ id: currentQuestion.id, userAnswer: val })
            }
          />
        )

      case "textInput":
        return (
          <TextInput
            value={getTypedAnswer<"textInput">(currentAnswer)}
            onChange={(val) =>
              setAnswer({ id: currentQuestion.id, userAnswer: val })
            }
          />
        )

      default:
        return null
    }
  }

  return (
    <Card 
      key={currentQuestion.id} 
      className="flex flex-col w-full animate-in fade-in slide-in-from-right-4 duration-200 ease-out"
    >
      <CardHeader className="pb-4 shrink-0">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md font-medium">
            Question {questionNumber} of {questionsCount}
          </span>
          <span className="capitalize text-xs bg-muted px-2 py-0.5 rounded-md">
            {QUESTION_TYPE_LABELS[currentQuestion.questionType]}
          </span>
        </div>
        <h2 className="text-lg font-medium text-foreground leading-relaxed">
          {currentQuestion.questionText}
        </h2>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-start">
        {renderInput()}
      </CardContent>
    </Card>
  )
}
