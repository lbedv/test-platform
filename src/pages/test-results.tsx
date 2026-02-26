import { Separator } from "@/components/ui/separator"
import { ScoreCard, AnswersBreakdown, ResultsHeader, ResultsActions, useTestResultsPage } from "@/features/test-results"

export function TestResultsPage() {
  const { result, attemptId } = useTestResultsPage()

  return (
    <div className="min-h-screen bg-background">
      <ResultsHeader testTitle={result.testTitle} />

      <main className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <section aria-label="Score summary">
            <ScoreCard result={result} />
          </section>
          <section aria-label="Question breakdown">
            <AnswersBreakdown questions={result.questions} />
          </section>
          <Separator />
          <ResultsActions attemptId={attemptId} />
        </div>
      </main>
    </div>
  )
}
