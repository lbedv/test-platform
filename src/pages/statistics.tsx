import {
  TestSelector,
  StatsSummary,
  AttemptsTable,
  useStatisticsPage,
} from "@/features/statistics"
import { EmptyState, PageHeader } from "@/components/common"
import { FileText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticsPage() {
  const {
    selectedTestId,
    selectedTest,
    stats,
    attempts,
    tests,
    isLoading,
    isError,
    onSelectTest,
  } = useStatisticsPage()

  if (isLoading) {
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

  if (isError) {
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
        selectedId={selectedTestId ?? ""}
        onSelect={onSelectTest}
      />
      {stats.totalAttempts > 0 ? (
        <>
          {selectedTest && <StatsSummary test={selectedTest} stats={stats} />}
          <AttemptsTable attempts={attempts} />
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
