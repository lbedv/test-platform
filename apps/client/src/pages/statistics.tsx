import { useState } from "react"
import {
  TestSelector,
  StatsSummary,
  AttemptsTable,
  useGetUserTests,
  useGetTestStats,
  useGetTestAttempts,
} from "@/features/statistics"
import { EmptyState, PageHeader } from "@/components/common"
import { FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticsPage() {
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
    undefined,
  )
  const { data: tests, isLoading: isTestsLoading, isError: isTestsError } = useGetUserTests()
  const effectiveTestId =
    selectedTestId || (tests && tests.length > 0 ? tests[0].id : undefined)
  
  const { data: stats, isLoading: isStatsLoading, isError: isStatsError } = useGetTestStats(effectiveTestId || "")
  const { data: attempts, isLoading: isAttemptsLoading, isError: isAttemptsError } = useGetTestAttempts(effectiveTestId || "")

  if (isTestsLoading) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Statistics"
          description="View detailed performance data for your created tests."
        />
        <Skeleton className="h-10 w-full max-w-xs rounded-lg" />
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    )
  }

  if (isTestsError || !tests) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Statistics"
          description="View detailed performance data for your created tests."
        />
        <p className="text-sm text-destructive">
          Failed to load statistics data.
        </p>
      </div>
    )
  }

  if (tests.length === 0) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          title="Statistics"
          description="View detailed performance data for your created tests."
        />
        <EmptyState
          icon={<FileText />}
          title="No published tests"
          description="You haven't published any tests yet. Create and publish a test to see statistics here."
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Statistics"
        description="View detailed performance data for your created tests."
      />
      <TestSelector
        tests={tests}
        selectedId={effectiveTestId ?? ""}
        onSelect={setSelectedTestId}
      />
      {isStatsLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : isStatsError || !stats ? (
        <p className="text-sm text-destructive">Failed to load test statistics.</p>
      ) : stats.totalAttempts > 0 ? (
        <>
          {<StatsSummary stats={stats} />}
          {isAttemptsLoading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : isAttemptsError || !attempts ? (
            <p className="text-sm text-destructive">Failed to load test attempts.</p>
          ) : (
            <AttemptsTable attempts={attempts} totalPoints={stats.totalPoints} />
          )}
        </>
      ) : (
        <EmptyState
          icon={<FileText />}
          title="No attempts yet"
          description="This test has no recorded attempts. Share it with others to start collecting data."
        />
      )}

    </div>
  )
}
