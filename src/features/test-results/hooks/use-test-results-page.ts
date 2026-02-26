import { useMemo } from "react"
import { useParams } from "@tanstack/react-router"
import { DEMO_TEST, DEMO_TEST_ATTEMPT } from "@/data/shared-test-data"
import { gradeTest, getDemoAnswers } from "../results-data"

export function useTestResultsPage() {
  const { id } = useParams({ strict: false })

  const { answers, timeTaken } = useMemo(() => getDemoAnswers(), [])
  
  const result = useMemo(
    () => gradeTest(DEMO_TEST, answers, timeTaken),
    [answers, timeTaken]
  )
  
  const attemptId = id ?? DEMO_TEST_ATTEMPT.id

  return { result, attemptId }
}
