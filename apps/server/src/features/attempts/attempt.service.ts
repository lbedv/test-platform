import mongoose from "mongoose";
import { createError } from "../../utils/createError.js";
import * as attemptMapper from "./attempt.mapper.js";
import { IQuestion, Test } from "../tests/test.model.js";
import { Attempt, IAnswer, PopulatedAttempt, AttemptStats } from "./attempt.model.js";import { User } from "../users/user.model.js";import { AnswerOutcome, QuestionType } from "@test-platform/shared/constants";
import { AnswerType, UpdateAnswerRequest, ActiveAttemptResponse, AttemptResultsResponse, AttemptSummary, UpdateAnswerResponse, SubmitAttempResponse, StartAttemptResponse } from "@test-platform/shared/schemas";

// --- CORE SERVICES ---

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

export const createAttempt = async (
  testId: string,
  userId: string
): Promise<StartAttemptResponse> => {
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

  const test = await Test.findOne({ _id: testId, deletedAt: null }).lean();
  if (!test) throw createError("Test not found or has been deleted", 404);

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

export const submitAttempt = async (attemptId: string): Promise<SubmitAttempResponse> => {
  const attempt = await Attempt.findById(attemptId).select('_id status testId userId answers createdAt expiresAt');
  if (!attempt) throw createError("Attempt not found", 404);
  if (attempt.status === "completed") throw createError("Attempt already completed", 400);

  const test = await Test.findById(attempt.testId).select('questions totalPoints passingPercentage totalAttempts totalScore totalTimeTaken passedAttempts');
  if (!test) throw createError("Test not found", 404);

  const pointsEarned = evaluateAttemptAnswers(attempt.answers, test.questions);
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

  // Update test stats counters
  test.totalAttempts += 1;
  test.totalScore += metrics.percentage;
  test.totalTimeTaken += metrics.timeTakenSeconds;
  if (metrics.isPassed) {
    test.passedAttempts += 1;
  }
  await test.save();

  // Update user stats counters
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

export const getAttemptResults = async (attemptId: string): Promise<AttemptResultsResponse> => {
  const attempt = await Attempt.findById(attemptId)
    .select('_id testId status pointsEarned percentage timeTakenSeconds completedAt isPassed answers')
    .populate("testId", "_id questions testTitle testCategory testDifficulty totalPoints timeLimitSeconds passingPercentage questionsCount")
    .lean<PopulatedAttempt>();

  if (!attempt || attempt.status !== "completed") {
    throw createError("Attempt not found or not completed", 404);
  }

  return attemptMapper.toAttemptResult(attempt);
};

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

export const validateAttemptOwnership = async (attemptId: string, userId: string) => {
  const attempt = await Attempt.findById(attemptId).select('userId').lean();
  if (!attempt) {
    throw createError("Attempt not found", 404);
  }
  if (attempt.userId.toString() !== userId) {
    throw createError("Unauthorized: Attempt does not belong to current user", 403);
  }
};

const evaluateAnswer = (
  questionType: QuestionType,
  correctAnswer: AnswerType,
  userAnswer?: AnswerType,
): AnswerOutcome => {
  if (userAnswer === undefined) return "skipped";

  if (questionType === "multipleChoice") {
    if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) return "incorrect";
    if (userAnswer.length !== correctAnswer.length) return "incorrect";
    
    const correctSet = new Set(correctAnswer);
    const userSet = new Set(userAnswer);
    if (userSet.size !== correctSet.size) return "incorrect";
    return [...userSet].every((a) => correctSet.has(a)) ? "correct" : "incorrect";
  } 
  
  if (questionType === "textInput") {
    return String(userAnswer).toLowerCase().trim() === String(correctAnswer).toLowerCase().trim() ? "correct" : "incorrect";
  } 
  
  return userAnswer === correctAnswer ? "correct" : "incorrect";
};

const evaluateAttemptAnswers = (answers: IAnswer[], questions: IQuestion[]): number => {
  const testQuestionMap = new Map<string, IQuestion>();
  (questions).forEach((q: IQuestion) => {
    testQuestionMap.set(q.id, q);
  });

  let pointsEarned = 0;

  (answers).forEach((answer: IAnswer) => {
    const testQuestion = testQuestionMap.get(answer.id);
    if (!testQuestion) return;

    const outcome = evaluateAnswer(
      testQuestion.questionType,
      testQuestion.correctAnswer,
      answer.userAnswer,
    );

    if (outcome === "correct") pointsEarned += testQuestion.pointsPossible;
    answer.answerOutcome = outcome;
  });

  return pointsEarned;
};

const calculateAttemptMetrics = (
  expiresAt: Date,
  createdAt: Date,
  totalPoints: number,
  pointsEarned: number,
  passingPercentage: number
) => {
  const now = new Date();
  const completedAt = now > expiresAt ? expiresAt : now;
  const timeTakenSeconds = Math.floor((completedAt.getTime() - createdAt.getTime()) / 1000);
  const percentage = Math.round((pointsEarned / (totalPoints || 1)) * 100);
  const isPassed = percentage >= passingPercentage;

  return { completedAt, timeTakenSeconds, percentage, isPassed };
};