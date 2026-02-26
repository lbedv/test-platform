import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw } from "lucide-react"

interface ResultsActionsProps {
  attemptId: string
}

export function ResultsActions({ attemptId }: ResultsActionsProps) {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-3 pb-8 sm:flex-row sm:justify-center">
      <Button
        variant="outline"
        onClick={() => navigate({ to: PathConstants.TEST_ATTEMPT, params: { id: attemptId } })}
        className="gap-1.5 w-full sm:w-auto"
      >
        <RotateCcw className="h-4 w-4" />
        Retake Test
      </Button>
      <Button
        variant="secondary"
        onClick={() => navigate({ to: PathConstants.INDEX })}
        className="gap-1.5 w-full sm:w-auto"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
    </div>
  )
}
