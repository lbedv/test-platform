import type { TestStatus } from "@/types/test"

export interface TestItem {
  id: string
  title: string
  description: string
  status: TestStatus
  questions: number
  attempts: number
}

export interface Attempt {
  id: string
  testId: string
  testTitle: string
  testCategory: string
  score: number
  totalPoints: number
  percentage: number
  timeTaken: string
  completedAt: string
  passed: boolean
}
