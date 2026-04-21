import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ScoreCard,
  ResultsPanel,
  ResultsHeader,
  ResultsActions,
  useGetAttemptResults,
} from "@/features/test-results"

// TestResultsPage component - Displays the results of a completed test, including score summary and question breakdown.
export function TestResultsPage() {
  const { data: results, isLoading, isError } = useGetAttemptResults()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8">
            <Skeleton className="h-8 w-1/3 rounded" />
            <Skeleton className="h-48 rounded" />
            <Skeleton className="h-10 w-1/4 rounded" />
          </div>
        </main>
      </div>
    )
  }

  if (isError || !results) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8">
            <p className="text-lg font-medium text-destructive">
              Error loading test results.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-background">
      <ResultsHeader testTitle={results.testTitle} />
      <main className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
        <div className="flex flex-col gap-8">
          <section aria-label="Score summary">
            <ScoreCard results={results} />
          </section>
          <section aria-label="Question breakdown">
            <ResultsPanel questions={results.questions} />
          </section>
          <Separator />
          <ResultsActions testId={results.testId} />
        </div>
      </main>
    </div>
  )
}
