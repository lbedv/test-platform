import { useParams, useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import {
  QuestionDisplay,
  FinishDialog,
  TestAttemptHeader,
  TestAttemptFooter,
  TestSubmittingScreen,
  useTestAttemptPage,
} from "@/features/test-attempt"
import { useStartAttempt } from "@/features/test-attempt/hooks/use-start-attempt"
import { useSubmitAttempt } from "@/features/test-attempt/hooks/use-submit-attempt"
import { Skeleton } from "@/components/ui/skeleton"
import type { TestData, TestAnswer } from "@/features/test-attempt/types"

export function TestAttemptPage() {
  const { id } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data, isLoading, isError } = useStartAttempt(id)
  const submitMutation = useSubmitAttempt()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-64 w-full max-w-xl rounded-xl" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <p className="text-destructive font-semibold">Failed to load test.</p>
        <button
          onClick={() => navigate({ to: PathConstants.CATALOG })}
          className="text-sm text-primary underline"
        >
          Back to catalog
        </button>
      </div>
    )
  }

  return (
    <TestAttemptInner
      test={data.test}
      attemptId={data.attemptId}
      onSubmit={(aId, answers) =>
        submitMutation.mutate(
          { attemptId: aId, answers },
          {
            onSuccess(res) {
              navigate({
                to: PathConstants.TEST_RESULTS,
                params: { id: res.resultId },
              })
            },
          },
        )
      }
      isSubmitting={submitMutation.isPending}
    />
  )
}

function TestAttemptInner({
  test,
  attemptId,
  onSubmit,
  isSubmitting,
}: {
  test: TestData
  attemptId: string
  onSubmit: (attemptId: string, answers: TestAnswer[]) => void
  isSubmitting: boolean
}) {
  const {
    currentIndex,
    answers,
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

  if (isSubmitted || isSubmitting) {
    return <TestSubmittingScreen attemptId={attemptId} />
  }

  function onConfirmFinish() {
    handleConfirmFinish()
    onSubmit(attemptId, answers)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TestAttemptHeader
        test={test}
        answeredCount={answeredCount}
        timeRemaining={timeRemaining}
        onTimeUp={() => {
          handleTimeUp()
          onSubmit(attemptId, answers)
        }}
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
        onConfirm={onConfirmFinish}
        totalQuestions={test.totalQuestions}
        answeredCount={answeredCount}
        skippedCount={skippedIndices.size}
      />
    </div>
  )
}
