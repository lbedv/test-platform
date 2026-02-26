import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"

interface ResultsHeaderProps {
  testTitle: string
}

export function ResultsHeader({ testTitle }: ResultsHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="hidden h-5 w-5 shrink-0 text-primary sm:block" />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold text-foreground md:text-base">
              Test Results
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              {testTitle}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: PathConstants.INDEX })}
          className="gap-1.5 shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>
      </div>
    </header>
  )
}
