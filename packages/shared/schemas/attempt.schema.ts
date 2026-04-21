import { z } from "zod";
import { QuestionResultSchema, QuestionWithUserAnswerSchema } from "./question.schema.js";
import { BaseTestInfoSchema } from './test.schema.js';
import { AttemptStatusSchema } from '../constants/attempt.constants.js';

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

export const StartAttemptResponseSchema = z.object({
  attemptId: z.string(),
  wasResumed: z.boolean(),
  startedAt: z.string(),
  expiresAt: z.string(),
});
export type StartAttemptResponse = z.infer<typeof StartAttemptResponseSchema>;

export const UpdateAnswerResponseSchema = z.object({
  status: z.enum(["in_progress", "completed"]),
  secondsRemaining: z.number(),
  attemptId: z.string(),
});
export type UpdateAnswerResponse = z.infer<typeof UpdateAnswerResponseSchema>;

export const SubmitAttempResponseSchema = z.object({
  attemptId: z.string(),
  completedAt: z.string(),
});
export type SubmitAttempResponse = z.infer<typeof SubmitAttempResponseSchema>;

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
