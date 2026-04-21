import { TestHeader } from "./test-header"
import { QuestionGrid } from './question-grid';
import { ActiveQuestionRenderer } from "./active-question-renderer"
import { TestNavigation } from "./test-navigation"
import { useTestTimer } from "../hooks/use-test-timer"
import { useTestManager } from "../hooks/use-test-manager"
import { useQuestionGrid } from "../hooks/use-question-grid";
import { SubmitDialog } from "./submit-dialog";
import { useSubmitDialog } from "../hooks/use-submit-dialog";
import type { ActiveAttemptResponse } from "@test-platform/shared/schemas";

interface TestContainerProps {
  attempt: ActiveAttemptResponse
}

/**
 * TestContainer component - Main container for the test attempt interface.
 * Manages state and logic for the test attempt, including current question, answers, timer, and submission.
 */
export function TestContainer({ attempt }: TestContainerProps) {

  const {
    // State
    currentIndex,
    currentQuestion,
    currentAnswer,
    // Counts
    questionsCount,
    answeredCount,
    // Handlers
    setAnswer,
    setSafeCurrentIndex,
    goToNextQuestion,
    goToPrevQuestion,
    isAnswered
  } = useTestManager(
    attempt.id,
    attempt.questions
  )

  
  const gridProps = useQuestionGrid(
    attempt.questions, 
    currentIndex, 
    setSafeCurrentIndex
  );
  const  {
    showFinishDialog,
    isLoading,
    isError,
    setShowFinishDialog,
    handleConfirmSubmit,
    handleSubmit
   } = useSubmitDialog( attempt.id )

  const { timeLeft } = useTestTimer(attempt.startedAt, attempt.timeLimitSeconds, handleConfirmSubmit)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TestHeader
        testTitle={attempt.testTitle}
        testCategory={attempt.testCategory}
        testDifficulty={attempt.testDifficulty}
        timeRemaining={timeLeft}
        answeredCount={answeredCount}
        questionsCount={questionsCount}
      />

      <div className="flex-1 flex flex-col px-4 py-6">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <ActiveQuestionRenderer
              currentQuestion={currentQuestion}
              currentIndex={currentIndex}
              questionsCount={questionsCount}
              currentAnswer={currentAnswer}
              setAnswer={setAnswer}
            />
          </div>
        </div>
        <div className="mt-6">
          <QuestionGrid
            {...gridProps}
            currentIndex={currentIndex}
            isAnswered={isAnswered}
          />
        </div>
      </div>

      <TestNavigation
        currentIndex={currentIndex}
        questionsCount={questionsCount}
        goToPrevQuestion={goToPrevQuestion}
        goToNextQuestion={goToNextQuestion}
        onSubmit={handleSubmit}
      />

      <SubmitDialog
        open={showFinishDialog}
        onOpenChange={setShowFinishDialog}
        skippedCount={questionsCount - answeredCount}
        questionsCount={questionsCount}
        isLoading={isLoading}
        isError={isError}
        onConfirmSubmit={handleConfirmSubmit}
      />
    </div>
  )
}
