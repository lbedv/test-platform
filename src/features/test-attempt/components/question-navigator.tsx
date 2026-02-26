import { QuestionNumberButton } from "./question-number-button"

interface QuestionNavigatorProps {
  totalQuestions: number
  currentIndex: number
  answeredIndices: Set<number>
  skippedIndices: Set<number>
  onNavigate: (index: number) => void
}

export function QuestionNavigator({
  totalQuestions,
  currentIndex,
  answeredIndices,
  skippedIndices,
  onNavigate,
}: QuestionNavigatorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" role="navigation" aria-label="Question navigation">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <QuestionNumberButton
          key={i}
          number={i + 1}
          isCurrent={i === currentIndex}
          isAnswered={answeredIndices.has(i)}
          isSkipped={skippedIndices.has(i)}
          onNavigate={() => onNavigate(i)}
        />
      ))}
    </div>
  )
}
