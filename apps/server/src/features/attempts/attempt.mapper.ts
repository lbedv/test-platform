import { IAnswer, PopulatedAttempt, AttemptStats } from "./attempt.model";
import { IQuestion } from "../tests/test.model";
import { ActiveAttemptResponse, AttemptSummary, AttemptResultsResponse, AttemptStatsResponse } from "@test-platform/shared/schemas";

// Attempt data mapper - transforms database documents to API response formats

// Map populated attempt document to active attempt response
// Includes test info and questions with user's current answers (for test in-progress)
export const toActiveAttemptResponse = (attempt: PopulatedAttempt): ActiveAttemptResponse => {
  const test = attempt.testId;

  // Map user's answers to question IDs for quick lookup
  const answersMap = new Map(
    attempt.answers.map((a) => [a.id, a.userAnswer])
  );

  // Sort questions by number and include user's current answers
  const sortedQuestions = test.questions
    .map((q: IQuestion) => ({
      id: q.id,
      questionText: q.questionText,
      questionNumber: q.questionNumber,
      pointsPossible: q.pointsPossible,
      questionType: q.questionType,
      options: q.options,
      userAnswer: answersMap.get(q.id),
    }))
    .sort((a, b) => a.questionNumber - b.questionNumber);
  
  return {
    id: attempt._id.toString(),
    testId: test._id.toString(),
    userId: attempt.userId.toString(),
    status: attempt.status,
    startedAt: attempt.createdAt.toISOString(),
    expiresAt: attempt.expiresAt.toISOString(),

    // Map the test data
    testTitle: test.testTitle,
    testCategory: test.testCategory,
    testDifficulty: test.testDifficulty,
    totalPoints: test.totalPoints,
    timeLimitSeconds: test.timeLimitSeconds,
    passingPercentage: test.passingPercentage,
    questionsCount: test.questionsCount,

    questions: sortedQuestions,
  };
};

// Map populated attempt document to attempt result response
// Includes correct answers, user answers, and evaluation outcomes
export const toAttemptResult = (attempt: PopulatedAttempt): AttemptResultsResponse => {
  const test = attempt.testId;

  // Map attempt answers to question IDs for quick lookup
  const answersMap = new Map(
    attempt.answers.map((a: IAnswer) => [a.id, a])
  );

  // Sort questions and include correct answers with evaluation outcomes
  const sortedQuestions = test.questions
    .map((q: IQuestion) => {
      const userAnswerData = answersMap.get(q.id);

      return {
        id: q.id,
        questionText: q.questionText,
        questionNumber: q.questionNumber,
        pointsPossible: q.pointsPossible,
        questionType: q.questionType,
        options: q.options,
        correctAnswer: q.correctAnswer, 

        userAnswer: userAnswerData?.userAnswer,
        answerOutcome: userAnswerData?.answerOutcome || "skipped",
      };
    })
    .sort((a, b) => a.questionNumber - b.questionNumber);

  return {
    id: attempt._id.toString(),
    pointsEarned: attempt.pointsEarned,
    percentage: attempt.percentage,
    timeTakenSeconds: attempt.timeTakenSeconds,
    completedAt: attempt.completedAt.toISOString(),
    isPassed: attempt.isPassed,
    
    // Map the test data
    testId: test._id.toString(),
    testTitle: test.testTitle,
    testCategory: test.testCategory,
    testDifficulty: test.testDifficulty,
    totalPoints: test.totalPoints,
    timeLimitSeconds: test.timeLimitSeconds,
    passingPercentage: test.passingPercentage,
    questionsCount: test.questionsCount,
    
    questions: sortedQuestions, 
  };
};

// Map populated attempt document to attempt summary format
// Used for attempt history/results list
export const toAttemptSummary = (attempt: PopulatedAttempt) : AttemptSummary => ({
  id: attempt._id.toString(),
  testId: attempt.testId._id.toString(),
  testTitle: attempt.testId.testTitle,
  testCategory: attempt.testId.testCategory,
  testDifficulty: attempt.testId.testDifficulty,
  pointsEarned: attempt.pointsEarned,
  totalPoints: attempt.testId.totalPoints,
  timeTakenSeconds: attempt.timeTakenSeconds,
  timeLimitSeconds: attempt.testId.timeLimitSeconds,
  percentage: attempt.percentage,
  passingPercentage: attempt.testId.passingPercentage,
  questionsCount: attempt.testId.questionsCount,
  completedAt: attempt.completedAt.toISOString(),
  isPassed: attempt.isPassed,
});

// Map attempt statistics to response format for leaderboards
export const toAttemptsList = (attempts: AttemptStats[]): AttemptStatsResponse[] =>
  attempts.map((attempt): AttemptStatsResponse => ({
    id: attempt._id.toString(),
    participant: {
      firstName: attempt.userId.firstName,
      lastName: attempt.userId.lastName,
    },
    completedAt: attempt.completedAt.toISOString(),
    percentage: attempt.percentage,
    pointsEarned: attempt.pointsEarned,
    timeTakenSeconds: attempt.timeTakenSeconds,
    isPassed: attempt.isPassed,
  }));

