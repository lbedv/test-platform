import { useState } from "react"
import { CREATED_TESTS, getAttemptsForTest, getStatsForTest } from "../statistics-data"

export function useStatisticsPage() {
  const [selectedTestId, setSelectedTestId] = useState(CREATED_TESTS[0].id)
  
  const selectedTest = CREATED_TESTS.find((t) => t.id === selectedTestId)!
  const stats = getStatsForTest(selectedTestId)
  const attempts = getAttemptsForTest(selectedTestId)

  return {
    selectedTestId,
    selectedTest,
    stats,
    attempts,
    tests: CREATED_TESTS,
    onSelectTest: setSelectedTestId,
  }
}
