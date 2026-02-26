import { useState } from "react"
import {
  useCreatedTests,
  useTestStats,
  useTestAttempts,
} from "./use-test-statistics"

export function useStatisticsPage() {
  const [selectedTestId, setSelectedTestId] = useState<string | undefined>(
    undefined,
  )

  const {
    data: tests,
    isLoading: isLoadingTests,
    isError: isErrorTests,
  } = useCreatedTests()

  // Auto-select first test when data arrives and nothing is selected yet
  const effectiveTestId =
    selectedTestId ?? (tests && tests.length > 0 ? tests[0].id : undefined)

  const { data: stats, isLoading: isLoadingStats } =
    useTestStats(effectiveTestId)
  const { data: attempts, isLoading: isLoadingAttempts } =
    useTestAttempts(effectiveTestId)

  const selectedTest = tests?.find((t) => t.id === effectiveTestId) ?? null

  return {
    selectedTestId: effectiveTestId,
    selectedTest,
    stats: stats ?? {
      testId: effectiveTestId ?? "",
      averageScore: 0,
      totalAttempts: 0,
      completionRate: 0,
      passRate: 0,
      averageTime: 0,
    },
    attempts: attempts ?? [],
    tests: tests ?? [],
    isLoading: isLoadingTests || isLoadingStats || isLoadingAttempts,
    isError: isErrorTests,
    onSelectTest: setSelectedTestId,
  }
}
