// Test attempt request and response schemas
// Defines validation and types for attempt lifecycle (start, update, submit, results)
import { z } from "zod";
import { QuestionResultSchema, QuestionWithUserAnswerSchema } from "./question.schema.js";
import { BaseTestInfoSchema } from './test.schema.js';
import { AttemptStatusSchema } from '../constants/attempt.constants.js';

// Active attempt response when user starts or resumes a test
// Contains test info, questions with user's current answers
export const ActiveAttemptResponseSchema = BaseTestInfoSchema.extend({
  id: z.string(),
  testId: z.string(),
  userId: z.string(),
  status: AttemptStatusSchema,
  startedAt: z.string(),
  expiresAt: z.string(),
  questions: z.array(QuestionWithUserAnswerSchema),
});
export type ActiveAttemptResponse = z.infer<typeof ActiveAttemptResponseSchema>;

// Final results after attempt submission
// Contains test info, answers with correct responses and outcomes, score and time
export const AttemptResultsResponseSchema = BaseTestInfoSchema.extend({
  id: z.string(),
  testId: z.string(),
  pointsEarned: z.number(),
  percentage: z.number(),
  timeTakenSeconds: z.number(),
  isPassed: z.boolean(),
  completedAt: z.string(),
  questions: z.array(QuestionResultSchema),
});
export type AttemptResultsResponse = z.infer<typeof AttemptResultsResponseSchema>;

// Summary card for past attempts (used in history/results list)
export const AttemptSummarySchema = BaseTestInfoSchema.extend({
  id: z.string(),
  testId: z.string(),
  pointsEarned: z.number(),
  percentage: z.number(),
  timeTakenSeconds: z.number(),
  completedAt: z.string(),
  isPassed: z.boolean(),
});
export type AttemptSummary = z.infer<typeof AttemptSummarySchema>;

// Response when starting or resuming an attempt
export const StartAttemptResponseSchema = z.object({
  attemptId: z.string(),
  wasResumed: z.boolean(), // true if resuming existing attempt
  startedAt: z.string(),
  expiresAt: z.string(),
});
export type StartAttemptResponse = z.infer<typeof StartAttemptResponseSchema>;

// Response when updating a single answer during attempt
export const UpdateAnswerResponseSchema = z.object({
  status: z.enum(["in_progress", "completed"]),
  secondsRemaining: z.number(),
  attemptId: z.string(),
});
export type UpdateAnswerResponse = z.infer<typeof UpdateAnswerResponseSchema>;

// Response after submitting completed attempt
export const SubmitAttempResponseSchema = z.object({
  attemptId: z.string(),
  completedAt: z.string(),
});
export type SubmitAttempResponse = z.infer<typeof SubmitAttempResponseSchema>;

// Attempt statistics for display on test analytics/leaderboard
export const AttemptStatsResponseSchema = z.object({
  id: z.string(),
  participant: z.object({
    firstName: z.string(),
    lastName: z.string()
  }),
  completedAt: z.string(),
  percentage: z.number(),
  pointsEarned: z.number(),
  timeTakenSeconds: z.number(),
  isPassed: z.boolean()
});
export type AttemptStatsResponse = z.infer<typeof AttemptStatsResponseSchema>;
