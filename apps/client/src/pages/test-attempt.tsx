import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { TestContainer, useGetActiveAttempt } from "@/features/test-attempt";
import PathConstants from "@/routes/path-constants";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common";
import { FileExclamationPoint } from "lucide-react";

// TestAttemptPage component - The main page for taking a test, rendering the TestContainer with the test data.
export function TestAttemptPage () {
  const { data: attempt, isLoading, isError } = useGetActiveAttempt()

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-64 w-full max-w-xl rounded-xl" />
      </div>
    )
  }

  if (isError || !attempt) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
        <EmptyState
          icon={<FileExclamationPoint />}
          title="No active attempt"
          description="You don't have an active test attempt. Please start a test from the catalog to see it here."
        />
        <Button variant="outline" size="sm" asChild>
          <Link to={PathConstants.CATALOG}>
            Back to Catalog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <TestContainer
        attempt={attempt}
      />
    </div>
  )
} 