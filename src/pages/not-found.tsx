import { useNavigate } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import PathConstants from "@/app/routes/path-constants"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="text-lg text-muted-foreground">Page not found</p>
        </div>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          onClick={() => navigate({ to: PathConstants.INDEX })}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}
