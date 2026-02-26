import { useParams } from "@tanstack/react-router"
import {
  QuestionDisplay,
  FinishDialog,
  TestAttemptHeader,
  TestAttemptFooter,
  TestSubmittingScreen,
  useTestAttemptPage,
} from "@/features/test-attempt"
import { DEMO_TEST, DEMO_TEST_ATTEMPT } from "@/data/shared-test-data"

export function TestAttemptPage() {
  const { id } = useParams({ strict: false })
  const test = DEMO_TEST

  const {
    currentIndex,
    skippedIndices,
    timeRemaining,
    showFinishDialog,
    isSubmitted,
    currentQuestion,
    currentAnswer,
    answeredIndices,
    answeredCount,
    progressPercent,
    isFirst,
    isLast,
    updateAnswer,
    goTo,
    handleNext,
    handlePrev,
    handleSkip,
    handleFinish,
    handleConfirmFinish,
    handleTimeUp,
    handleTick,
    setShowFinishDialog,
  } = useTestAttemptPage(test)

  if (isSubmitted) {
    return <TestSubmittingScreen attemptId={id ?? DEMO_TEST_ATTEMPT.id} />
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TestAttemptHeader
        test={test}
        answeredCount={answeredCount}
        timeRemaining={timeRemaining}
        onTimeUp={handleTimeUp}
        onTick={handleTick}
        progressPercent={progressPercent}
      />

      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center py-10 md:py-16">
          <QuestionDisplay
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={test.totalQuestions}
            answer={currentAnswer}
            onAnswerChange={updateAnswer}
          />
        </div>
      </main>

      <TestAttemptFooter
        test={test}
        currentIndex={currentIndex}
        answeredIndices={answeredIndices}
        skippedIndices={skippedIndices}
        isFirst={isFirst}
        isLast={isLast}
        onNavigate={goTo}
        onPrev={handlePrev}
        onNext={handleNext}
        onSkip={handleSkip}
        onFinish={handleFinish}
      />

      <FinishDialog
        open={showFinishDialog}
        onOpenChange={setShowFinishDialog}
        onConfirm={handleConfirmFinish}
        totalQuestions={test.totalQuestions}
        answeredCount={answeredCount}
        skippedCount={skippedIndices.size}
      />
    </div>
  )
}
