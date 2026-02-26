import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ScoreCard,
  AnswersBreakdown,
  ResultsHeader,
  ResultsActions,
  useTestResultsPage,
} from "@/features/test-results"

export function TestResultsPage() {
  const { result, attemptId, isLoading, isError } = useTestResultsPage()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <p className="text-destructive font-semibold">
          Failed to load test results.
        </p>
      </div>
    )
  }

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
