// Test data mapper - transforms database documents to API response formats
import { ITest, PopulatedTest } from "./test.model";
import { TestSummary } from "@test-platform/shared/schemas";

// Transform test document to test summary for catalog display
// Includes author info and marking if test is owned by current user
export const toTestSummary = (test: PopulatedTest, currentUserId: string): TestSummary => ({
    id: test._id.toString(),
    testTitle: test.testTitle,
    testCategory: test.testCategory,
    testDifficulty: test.testDifficulty,
    totalPoints: test.totalPoints,
    timeLimitSeconds: test.timeLimitSeconds,
    passingPercentage: test.passingPercentage,
    questionsCount: test.questionsCount,
    description: test.description,
    attemptsCount: test.totalAttempts,
    isMine: currentUserId === test.userId._id.toString(),
    author: {
      firstName: test.userId.firstName,
      lastName: test.userId.lastName,
    },
    createdAt: test.createdAt.toISOString(),
});

export const toTestStatsResponse = (
  test: ITest,
  averageScore: number,
  completionRate: number,
  averageTime: number,
) => ({
  testId: test._id.toString(),
  testTitle: test.testTitle,
  testCategory: test.testCategory,
  testDifficulty: test.testDifficulty,
  totalPoints: test.totalPoints,
  timeLimitSeconds: test.timeLimitSeconds,
  passingPercentage: test.passingPercentage,
  questionsCount: test.questionsCount,
  averageScore: Math.round(averageScore),
  totalAttempts: test.totalAttempts,
  completionRate: Math.round(completionRate),
  passRate: Math.round(completionRate),
  averageTime: Math.round(averageTime),
});
