import { IAnswer, PopulatedAttempt, AttemptStats } from "./attempt.model";
import { IQuestion } from "../tests/test.model";
import { ActiveAttemptResponse, AttemptSummary, AttemptResultsResponse, AttemptStatsResponse } from "@test-platform/shared/schemas";

export const toActiveAttemptResponse = (attempt: PopulatedAttempt): ActiveAttemptResponse => {
  const test = attempt.testId;

  const answersMap = new Map(
    attempt.answers.map((a) => [a.id, a.userAnswer])
  );

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

export const toAttemptResult = (attempt: PopulatedAttempt): AttemptResultsResponse => {
  const test = attempt.testId;

  const answersMap = new Map(
    attempt.answers.map((a: IAnswer) => [a.id, a])
  );

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

