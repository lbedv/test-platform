import { cn } from "@/shared/lib/utils";
import { formatAnswers } from "../utils/answer-utils";
import type { AnswerType, AnswerOption }  from "@test-platform/shared/schemas";
import type { QuestionType, AnswerOutcome } from "@test-platform/shared/constants";
import { ANSWER_STYLES_MAP } from "../constants";

interface QuestionAnswerBlockProps {
  questionType: QuestionType;
  answerOutcome: AnswerOutcome;
  correctAnswer: AnswerType;
  userAnswer?: AnswerType;
  options?: AnswerOption[];
}

/**
 * QuestionAnswerBlock component - Displays the user's answer and the correct answer for a question in the results breakdown.
 * Applies different styling based on whether the user's answer was correct, incorrect, or skipped.
 */
export function QuestionAnswerBlock({ questionType, userAnswer, correctAnswer, answerOutcome, options }: QuestionAnswerBlockProps) {
  const { userText, correctText } = formatAnswers(correctAnswer, questionType, answerOutcome === "skipped", userAnswer, options);

  return (
    <div className="flex w-full gap-4 flex-col sm:flex-row">
      <AnswerDisplay
        isUserAnswer
        answer={userText}
        answerOutcome={answerOutcome}
      />
      <AnswerDisplay
        answer={correctText}
      />
    </div>
  );
}

export function AnswerDisplay({
  answer,
  answerOutcome = "correct", 
  isUserAnswer = false
}: { 
  answer: string | string[]
  answerOutcome?: AnswerOutcome
  isUserAnswer?: boolean
}) {
  const label = isUserAnswer ? "Your Answer" : "Correct Answer";
  const visualState = isUserAnswer ? answerOutcome : "correct";

  return (
    <div className="flex-1 flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "rounded-lg border px-4 py-3 text-sm",
          ANSWER_STYLES_MAP[visualState]
        )}
      >
        {Array.isArray(answer) ? (
          <div className="flex flex-wrap gap-1.5">
            {answer.map((item, index) => (
              <span 
                key={index} 
                className="inline-flex items-center rounded-md bg-background/60 px-2 py-0.5 text-xs font-medium border shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          <span className="font-medium leading-relaxed wrap-break-word">
            {answer}</span>
        )}
      </div>
    </div>
  )
}