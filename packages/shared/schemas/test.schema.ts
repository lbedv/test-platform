import { z } from 'zod';
import { QuestionWithCorrectAnswerSchema } from './question.schema.js';
import { CategorySchema, DifficultySchema, SortOptionsSchema, OwnershipOptionsSchema } from '../constants/test.constants.js';

// Zod Schemas
export const BaseTestInfoSchema = z.object({
  testTitle: z.string().min(3, "Title must be at least 3 characters"),
  testCategory: CategorySchema,
  testDifficulty: DifficultySchema,
  totalPoints: z.number(),
  timeLimitSeconds: z.number().min(60, "Must be at least 1 minute"),
  passingPercentage: z.number().min(50, "Must be at least 50").max(90, "Cannot exceed 90"),
  questionsCount: z.number(),
});

export const CreateTestRequestSchema = BaseTestInfoSchema.omit({ totalPoints: true, questionsCount: true }).extend({
  description: z.string().min(5, "Description must be at least 5 characters").max(1000, "Description cannot exceed 1000 characters"),
  questions: z.array(QuestionWithCorrectAnswerSchema).min(1, "You must add at least one question"),
});
export type CreateTestRequest = z.infer<typeof CreateTestRequestSchema>;

export const TestSummarySchema = BaseTestInfoSchema.extend({
  id: z.string(),
  description: z.string(),
  attemptsCount: z.number(),
  author: z.object({
    firstName: z.string(),
    lastName: z.string(),
    }),
  isMine: z.boolean(),
  createdAt: z.string(),
});
export type TestSummary = z.infer<typeof TestSummarySchema>;

export const CatalogFilterRequestSchema = z.object({
  search: z.string().optional(),
  category: CategorySchema.optional(),
  difficulty: DifficultySchema.optional(),
  ownership: OwnershipOptionsSchema.optional(),
  sortBy: SortOptionsSchema.optional(),
  page: z.coerce.number().int().positive().optional(),
});
export type CatalogFilterRequest = z.infer<typeof CatalogFilterRequestSchema>;

export const CatalogTestsResponseSchema = z.object({
  tests: z.array(TestSummarySchema),
  totalCount: z.number(),
});
export type CatalogTestsResponse = z.infer<typeof CatalogTestsResponseSchema>;

export const TestStatsResponseSchema = BaseTestInfoSchema.extend({
  testId: z.string(),
  averageScore: z.number(),
  totalAttempts: z.number(),
  completionRate: z.number(),
  passRate: z.number(),
  averageTime: z.number(),
});
export type TestStatsResponse = z.infer<typeof TestStatsResponseSchema>;

export const UserTestResponseSchema = z.object({
  id: z.string(),
  testTitle: z.string(),
})
export type UserTestResponse = z.infer<typeof UserTestResponseSchema>