// Attempt service - core business logic for test attempts
// Handles attempt creation, answer updates, submission, and result retrieval
import mongoose from "mongoose";
import { createError } from "../../utils/createError.js";
import * as attemptMapper from "./attempt.mapper.js";
import { IQuestion, Test } from "../tests/test.model.js";
import { Attempt, IAnswer, PopulatedAttempt, AttemptStats } from "./attempt.model.js";import { User } from "../users/user.model.js";import { AnswerOutcome, QuestionType } from "@test-platform/shared/constants";
import { AnswerType, UpdateAnswerRequest, ActiveAttemptResponse, AttemptResultsResponse, AttemptSummary, UpdateAnswerResponse, SubmitAttempResponse, StartAttemptResponse } from "@test-platform/shared/schemas";

// --- CORE SERVICES ---

// Retrieve active attempt (in-progress) for a user
export const getActiveAttempt = async (userId: string): Promise<ActiveAttemptResponse> => {

  const attempt = await Attempt.findOne({ userId: new mongoose.Types.ObjectId(userId), status: "in_progress" })
    .select('_id testId userId status createdAt expiresAt answers')
    .populate("testId", "_id questions testTitle testCategory testDifficulty totalPoints timeLimitSeconds passingPercentage questionsCount")
    .lean<PopulatedAttempt>();

  if (!attempt) {
    throw createError("No active attempt found for user", 404);
  }

  return attemptMapper.toActiveAttemptResponse(attempt);
};

// Create new attempt for a test or resume existing attempt
// Returns existing active attempt if one already exists
export const createAttempt = async (
  testId: string,
  userId: string
): Promise<StartAttemptResponse> => {
  // Check if user already has active attempt for this test
  const existingAttempt = await Attempt.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    testId: new mongoose.Types.ObjectId(testId),
    status: "in_progress"
  }).lean();

  // If an active attempt exists, return it instead of creating a new one
  if (existingAttempt) {
    return {
      attemptId: existingAttempt._id.toString(),
      wasResumed: true,
      startedAt: existingAttempt.createdAt.toISOString(),
      expiresAt: existingAttempt.expiresAt.toISOString(),
    };
  }

  // Get test to verify it exists and initialize answers
  const test = await Test.findOne({ _id: testId, deletedAt: null }).lean();
  if (!test) throw createError("Test not found or has been deleted", 404);

  // Create new attempt with empty answers (all skipped initially)
  const attempt = new Attempt({
    userId: new mongoose.Types.ObjectId(userId),
    testId: new mongoose.Types.ObjectId(testId),
    status: "in_progress",
    expiresAt: new Date(Date.now() + test.timeLimitSeconds * 1000),
    answers: test.questions.map((q) => ({
      id: q.id,
      answerOutcome: "skipped",
      questionType: q.questionType,
      userAnswer: undefined,
    })),
  });

  await attempt.save();

  return {
    attemptId: attempt._id.toString(),
    wasResumed: false,
    startedAt: attempt.createdAt.toISOString(),
    expiresAt: attempt.expiresAt.toISOString(),
  };
};

// Update single answer in active attempt, auto-submit if time expired
export const updateQuestionAnswer = async (
  attemptId: string, 
  questionInput: UpdateAnswerRequest
): Promise<UpdateAnswerResponse> => {
  const attempt = await Attempt.findById(attemptId).select('_id status expiresAt answers');
  if (!attempt) throw createError("Attempt not found", 404);
  if (attempt.status === "completed") throw createError("Attempt already completed", 400);

  const question = attempt.answers.find(a => a.id === questionInput.id);
  if (!question) throw createError("Question not found in attempt", 404);

  // Auto-submit if time ran out
  if (Date.now() > attempt.expiresAt.getTime() + 5000) { // 5 second grace period
    await submitAttempt(attemptId);
    return { 
      status: "completed", 
      secondsRemaining: 0, 
      attemptId 
    };
  }

  question.userAnswer = questionInput.userAnswer;
  await attempt.save();

  const secondsRemaining = Math.floor((attempt.expiresAt.getTime() - Date.now()) / 1000);

  return {
    status: "in_progress",
    secondsRemaining,
    attemptId,
  };
};

// Submit attempt: evaluate all answers, calculate score and metrics
// Updates test and user statistics counters for reporting
export const submitAttempt = async (attemptId: string): Promise<SubmitAttempResponse> => {
  const attempt = await Attempt.findById(attemptId).select('_id status testId userId answers createdAt expiresAt');
  if (!attempt) throw createError("Attempt not found", 404);
  if (attempt.status === "completed") throw createError("Attempt already completed", 400);

  const test = await Test.findById(attempt.testId).select('questions totalPoints passingPercentage totalAttempts totalScore totalTimeTaken passedAttempts');
  if (!test) throw createError("Test not found", 404);

  // Evaluate answers and calculate points earned
  const pointsEarned = evaluateAttemptAnswers(attempt.answers, test.questions);
  // Calculate attempt metrics (completion time, percentage score, pass/fail)
  const metrics = calculateAttemptMetrics(attempt.expiresAt, attempt.createdAt, test.totalPoints, pointsEarned, test.passingPercentage);

  Object.assign(attempt, {
    status: "completed",
    completedAt: metrics.completedAt,
    timeTakenSeconds: metrics.timeTakenSeconds,
    pointsEarned,
    percentage: metrics.percentage,
    isPassed: metrics.isPassed,
  });

  await attempt.save();

  // Update test denormalized statistics (used for leaderboards and analytics)
  test.totalAttempts += 1;
  test.totalScore += metrics.percentage;
  test.totalTimeTaken += metrics.timeTakenSeconds;
  if (metrics.isPassed) {
    test.passedAttempts += 1;
  }
  await test.save();

  // Update user denormalized statistics for dashboard
  const user = await User.findById(attempt.userId);
  if (user) {
    user.stats.totalTestsTaken += 1;
    user.stats.totalScore += metrics.percentage;
    user.stats.recentActivity = new Date().toISOString();
    await user.save();
  }

  return {
    attemptId,
    completedAt: attempt.completedAt.toISOString(),
  }
};

// Get attempt results: retrieves completed attempt with correct answers and user answers
// Shows evaluation outcomes for review/feedback
export const getAttemptResults = async (attemptId: string): Promise<AttemptResultsResponse> => {
  const attempt = await Attempt.findById(attemptId)
    .select('_id testId status pointsEarned percentage timeTakenSeconds completedAt isPassed answers')
    .populate("testId", "_id questions testTitle testCategory testDifficulty totalPoints timeLimitSeconds passingPercentage questionsCount")
    .lean<PopulatedAttempt>();

  // Only return results for completed attempts
  if (!attempt || attempt.status !== "completed") {
    throw createError("Attempt not found or not completed", 404);
  }

  return attemptMapper.toAttemptResult(attempt);
};

// Get user's completed attempts: retrieves all finished tests in reverse chronological order
// Used for user's attempt history
export const getCompletedAttempts = async (userId: string): Promise<AttemptSummary[]> => {
  const attempts = await Attempt.find({
    userId: new mongoose.Types.ObjectId(userId),
    status: "completed"
  })
  .select('_id testId pointsEarned timeTakenSeconds completedAt isPassed percentage')
  .populate("testId", "_id testTitle testCategory testDifficulty totalPoints timeLimitSeconds questionsCount passingPercentage")
  .sort({ createdAt: -1 })
  .lean<PopulatedAttempt[]>();

  return attempts.map(attemptMapper.toAttemptSummary);
};

// Get test leaderboard: retrieves all completed attempts for a test with participant details
// Used for test creator to view attempt statistics and leaderboard
export const getTestAttempts = async (testId: string) => {
  // Check if test is not soft-deleted
  const test = await Test.findOne({ _id: testId, deletedAt: null }).select('_id').lean();
  if (!test) throw createError("Test not found or has been deleted", 404);
  
  const attempts = await Attempt.find({ 
    testId: new mongoose.Types.ObjectId(testId),
    status: "completed"
  })
    .select('_id userId completedAt percentage pointsEarned timeTakenSeconds isPassed')
    .populate("userId", "firstName lastName")
    .lean<AttemptStats[]>();

  return attemptMapper.toAttemptsList(attempts);
};

// --- HELPER FUNCTIONS ---

// Verify attempt ownership: ensures user owns the attempt (for authorization checks)
export const validateAttemptOwnership = async (attemptId: string, userId: string) => {
  const attempt = await Attempt.findById(attemptId).select('userId').lean();
  if (!attempt) {
    throw createError("Attempt not found", 404);
  }
  // Verify owner matches current user
  if (attempt.userId.toString() !== userId) {
    throw createError("Unauthorized: Attempt does not belong to current user", 403);
  }
};

// Evaluate single answer: compare user answer to correct answer based on question type
// Handles: multipleChoice (array matching), textInput (case-insensitive), numeric/boolean (equality)
const evaluateAnswer = (
  questionType: QuestionType,
  correctAnswer: AnswerType,
  userAnswer?: AnswerType,
): AnswerOutcome => {
  // Unanswered questions are skipped
  if (userAnswer === undefined) return "skipped";

  // Multiple choice: arrays must match (order-independent, all options must match)
  if (questionType === "multipleChoice") {
    if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) return "incorrect";
    if (userAnswer.length !== correctAnswer.length) return "incorrect";
    
    const correctSet = new Set(correctAnswer);
    const userSet = new Set(userAnswer);
    if (userSet.size !== correctSet.size) return "incorrect";
    return [...userSet].every((a) => correctSet.has(a)) ? "correct" : "incorrect";
  } 
  
  // Text input: case-insensitive and whitespace-trimmed comparison
  if (questionType === "textInput") {
    return String(userAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim() ? "correct" : "incorrect";
  } 
  
  // Numeric and boolean: exact equality check
  return userAnswer === correctAnswer ? "correct" : "incorrect";
};

// Evaluate all answers: compares all user answers to correct answers
// Updates answer.answerOutcome for each question and returns total points earned
const evaluateAttemptAnswers = (answers: IAnswer[], questions: IQuestion[]): number => {
  // Create map for O(1) question lookups
  const testQuestionMap = new Map<string, IQuestion>();
  (questions).forEach((q: IQuestion) => {
    testQuestionMap.set(q.id, q);
  });

  let pointsEarned = 0;

  // Evaluate each answer and accumulate points
  (answers).forEach((answer: IAnswer) => {
    const testQuestion = testQuestionMap.get(answer.id);
    if (!testQuestion) return;

    // Evaluate this answer and store outcome
    const outcome = evaluateAnswer(
      testQuestion.questionType,
      testQuestion.correctAnswer,
      answer.userAnswer,
    );

    // Add points if correct
    if (outcome === "correct") pointsEarned += testQuestion.pointsPossible;
    answer.answerOutcome = outcome;
  });

  return pointsEarned;
};

// Calculate attempt metrics: completion time, score percentage, and pass/fail determination
// Respects time limit: caps completion time at expiresAt if exceeded
const calculateAttemptMetrics = (
  expiresAt: Date,
  createdAt: Date,
  totalPoints: number,
  pointsEarned: number,
  passingPercentage: number
) => {
  const now = new Date();
  // If time expired, use expiration time; otherwise use actual completion time
  const completedAt = now > expiresAt ? expiresAt : now;
  const timeTakenSeconds = Math.floor((completedAt.getTime() - createdAt.getTime()) / 1000);
  // Calculate percentage score (avoid division by zero)
  const percentage = Math.round((pointsEarned / (totalPoints || 1)) * 100);
  // Determine pass/fail based on minimum passing percentage
  const isPassed = percentage >= passingPercentage;

  return { completedAt, timeTakenSeconds, percentage, isPassed };
};