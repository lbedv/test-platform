// Test service - core business logic for test creation, retrieval, and filtering
// Handles catalog browsing, test creation, deletion, and statistics
import { CreateTestRequest, CatalogFilterRequest, CatalogTestsResponse, UserTestResponse } from "@test-platform/shared/schemas";
import * as testMapper from "./test.mapper.js";
import { Test, ITest, PopulatedTest } from "./test.model.js";
import { User } from "../users/user.model.js";
import { createError } from "../../utils/createError.js";
import mongoose, { FilterQuery } from "mongoose";

// Create new test with questions, calculate totals, and update user stats
export async function createTest(testData: CreateTestRequest, userId: string): Promise<ITest> {
  const test = new Test({
    ...testData,
    userId: new mongoose.Types.ObjectId(userId),
    attemptsCount: 0,
    questionsCount: testData.questions.length,
    // Calculate total points from all questions
    totalPoints: testData.questions.reduce((sum, q) => sum + q.pointsPossible, 0),
  });

  await test.save();

  // Update user stats - increment tests created and record activity
  const user = await User.findById(userId);
  if (user) {
    user.stats.testsCreated += 1;
    user.stats.recentActivity = new Date().toISOString();
    await user.save();
  }

  return test;
}

// Retrieve all non-deleted tests with author details
export async function getAllTests(): Promise<PopulatedTest[]> {
  return await Test.find({ deletedAt: null }).populate<{ userId: { _id: mongoose.Types.ObjectId; firstName: string; lastName: string } }>("userId", "firstName lastName").exec();
}

export async function deleteTest(testId: string): Promise<ITest | null> {
  
  // Soft delete - set deletedAt timestamp
  return await Test.findByIdAndUpdate(
    testId,
    { deletedAt: new Date() },
    { new: true }
  );
}

// Get paginated tests filtered by search, category, difficulty, and ownership
// Returns tests with pagination and author details
export const getCatalogTests = async (filters: CatalogFilterRequest, userId: string): Promise<CatalogTestsResponse> => {
  const { search, category, difficulty, ownership = "public", sortBy = "newest", page = 1 } = filters;
  const LIMIT = 6;

  // 1. Build the Database Query
  const query: FilterQuery<typeof Test> = { deletedAt: null }; // Exclude soft-deleted tests

  // Text search across title and description
  if (search?.trim()) {
    // Case-insensitive regex search across multiple fields
    query.$or = [
      { testTitle: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by category and difficulty
  if (category) query.testCategory = category;
  if (difficulty) query.testDifficulty = difficulty;
  
  // Filter by ownership (mine/public/all)
  if (ownership === "mine") {
    query.userId = new mongoose.Types.ObjectId(userId);
  } else if (ownership === "public") {
    query.userId = { $ne: new mongoose.Types.ObjectId(userId) };
  }

  // Build sorting options
  let sortOptions: Record<string, 1 | -1> = { createdAt: -1 }; // Default: newest

  switch (sortBy) {
    case "newest":
      sortOptions = { createdAt: -1 };
      break;
    case "oldest":
      sortOptions = { createdAt: 1 };
      break;
    case "attempts":
      sortOptions = { attemptsCount: -1 };
      break;
  }

  const skip = (page - 1) * LIMIT;

  const [totalCount, tests] = await Promise.all([
    Test.countDocuments(query),
    Test.find(query)
      .select("_id testTitle testCategory testDifficulty totalPoints timeLimitSeconds passingPercentage questionsCount description totalAttempts createdAt userId")
      .populate<{ userId: { _id: mongoose.Types.ObjectId; firstName: string; lastName: string } }>("userId", "firstName lastName")
      .sort(sortOptions)
      .skip(skip)
      .limit(LIMIT)
      .lean<PopulatedTest[]>()
  ]);

  return {
    tests: tests.map((test) => testMapper.toTestSummary(test, userId)),
    totalCount
  };
};

// Get aggregated test statistics - calculates metrics from attempts
export const getTestStats = async (testId: string) => {
  const test = await Test.findOne({ _id: testId, deletedAt: null })
    .select('_id testTitle testCategory testDifficulty totalPoints timeLimitSeconds passingPercentage questionsCount totalAttempts totalScore totalTimeTaken passedAttempts')
    .lean<ITest>();

  if (!test) {
    throw createError("Test not found", 404);
  }

  const averageScore = test.totalAttempts > 0 ? test.totalScore / test.totalAttempts : 0;
  const completionRate = test.totalAttempts > 0 ? (test.passedAttempts / test.totalAttempts) * 100 : 0;
  const averageTime = test.totalAttempts > 0 ? test.totalTimeTaken / test.totalAttempts : 0;

  return testMapper.toTestStatsResponse(test, averageScore, completionRate, averageTime);
};

// Get user's created tests - returns minimal info for test selection
export const getUserTests = async (userId: string): Promise<UserTestResponse[]> => {
  const tests = await Test.find({ userId: new mongoose.Types.ObjectId(userId), deletedAt: null })
    .select('_id testTitle')
    .sort({ createdAt: -1 })
    .lean<Array<{ _id: mongoose.Types.ObjectId; testTitle: string }>>();

  return tests.map((test) => ({
    id: test._id.toString(),
    testTitle: test.testTitle,
  }));
};

// Verify that the requesting user owns this test - authorization check
export const validateTestOwnership = async (testId: string, userId: string) => {
  const test = await Test.findById(testId).select('userId').lean();
  if (!test) {
    throw createError("Test not found", 404);
  }
  if (test.userId.toString() !== userId) {
    throw createError("Unauthorized: Test does not belong to current user", 403);
  }
};
