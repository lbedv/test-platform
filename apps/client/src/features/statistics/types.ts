import type { Category, Difficulty } from "@test-platform/shared/constants"

/**
 * Information about a single user's attempt on a test.
 * Shown in the attempts table under test statistics.
 */
export interface TestAttempt {
  id: string
  participant: {
    firstName: string
    lastName: string
  }
  completedAt: string
  percentage: number
  pointsEarned: number
  timeTakenSeconds: number
  isPassed: boolean
}

/**
 * Aggregated statistics for a specific test.
 * Shows overall performance metrics across all attempts.
 */
export interface TestStats {
    testTitle: string;
    testCategory: Category;
    testDifficulty: Difficulty;
    totalPoints: number;
    timeLimitSeconds: number;
    passingPercentage: number;
    questionsCount: number;
    testId: string;
    averageScore: number;
    totalAttempts: number;
    completionRate: number;
    passRate: number;
    averageTime: number;
}
