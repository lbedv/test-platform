import type { Category } from "@test-platform/shared/constants"

/** 
 * AttemptItem interface - Represents a single test attempt in the dashboard.
 */
export interface AttemptItem {
  id: string
  testId: string
  testTitle: string
  testCategory: Category
  pointsEarned: number
  totalPoints: number
  percentage: number
  timeTakenSeconds: number
  completedAt: string
  isPassed: boolean
}

/**
 * DashboardStats interface - Represents aggregated statistics for the user's dashboard.
 */
export interface DashboardStats {
  totalTestsTaken: number
  averageScore: number
  testsCreated: number
  recentActivity: string
}