import {
  TestSelector,
  StatsSummary,
  AttemptsTable,
  useStatisticsPage,
} from "@/features/statistics"
import { EmptyState, PageHeader } from "@/components/common"
import { FileText } from "lucide-react"

export function StatisticsPage() {
  const { selectedTestId, selectedTest, stats, attempts, tests, onSelectTest } =
    useStatisticsPage()

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Statistics"
        description="View detailed performance data for your created tests."
      />
      <TestSelector
        tests={tests}
        selectedId={selectedTestId}
        onSelect={onSelectTest}
      />
      {stats.totalAttempts > 0 ? (
        <>
          <StatsSummary test={selectedTest} stats={stats} />
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
