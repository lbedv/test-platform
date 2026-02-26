import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { PageHeader } from "@/components/common"
import { Flag } from "lucide-react"

interface TestSubmittingScreenProps {
  attemptId: string
}

export function TestSubmittingScreen({ attemptId }: TestSubmittingScreenProps) {
  const navigate = useNavigate()

  // Navigate to test results
  setTimeout(() => {
    navigate({ to: PathConstants.TEST_RESULTS, params: { id: attemptId } })
  }, 0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Flag className="h-8 w-8 text-primary" />
        </div>
        <PageHeader
          title="Submitting..."
          description="Calculating your results. Please wait."
        />
      </div>
    </div>
  )
}
