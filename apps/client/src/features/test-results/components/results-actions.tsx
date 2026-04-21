import { Link } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"
import { useStartAttempt } from "@/features/catalog/hooks/use-start-attempt"

interface ResultsActionsProps {
  testId: string
}

/**
 * ResultsActions component - Provides action buttons on the test results page.
 * Includes options to retake the test or return to the dashboard.
 */
export function ResultsActions({ testId }: ResultsActionsProps) {
  const { mutate: startAttempt, isPending } = useStartAttempt();

  return (
    <div className="flex flex-col items-center gap-3 pb-8 sm:flex-row sm:justify-center">
      <Button
        variant="outline"
        className="gap-1.5 w-full sm:w-auto"
        onClick={() => startAttempt(testId)}
        disabled={isPending}
      >
        <RotateCcw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
        {isPending ? "Starting..." : "Retake Test"}
      </Button>
      <Button
        asChild
        variant="secondary"
        className="gap-1.5 w-full sm:w-auto"
      >
        <Link to={PathConstants.INDEX}>
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </div>
  )
}