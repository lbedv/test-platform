// Question validation schemas
// Defines schemas for creating, displaying, and evaluating test questions
import { z } from 'zod';
import { QuestionTypeSchema, AnswerOutcomeSchema } from '../constants/question.constants.js';

// Answer type union - supports numeric, boolean, array of strings, or text
export const AnswerSchema = z.union([
  z.number(),
  z.boolean(),
  z.array(z.string()),
  z.string(),
])
export type AnswerType = z.infer<typeof AnswerSchema>

// Single option in a multiple-choice question
export const AnswerOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
});
export type AnswerOption = z.infer<typeof AnswerOptionSchema>;

// Base question fields shared across all question schemas
const QuestionWrapperBase = z.object({
  id: z.uuid(),
  questionText: z.string().min(1, "Question text is required"),
  questionNumber: z.number(),
  pointsPossible: z.number().min(1, "Points must be at least 1").max(100, "Points cannot exceed 100"),
  questionType: QuestionTypeSchema,
});

// Question schema with correct answer (for test creation)
// Validates questions during test authoring
export const QuestionWithCorrectAnswerSchema = QuestionWrapperBase.extend({
  correctAnswer: AnswerSchema,
  options: z.array(AnswerOptionSchema).optional(),
}).superRefine((question, ctx) => {
  // For multiple choice, validate options and correct answer
  if (question.questionType === 'multipleChoice') {
    if (!question.options || question.options.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ['options'],
        message: 'Multiple choice questions must have at least 2 options',
      })
    } else if (question.options.some((opt) => !opt.label || opt.label.trim().length === 0)) {
      ctx.addIssue({
        code: "custom",
        path: ['options'],
        message: 'All options must have labels',
      })
    }

    if (!Array.isArray(question.correctAnswer) || question.correctAnswer.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ['correctAnswer'],
        message: 'You must select a correct answer',
      })
    }
  }

  if (question.correctAnswer === "") {
      ctx.addIssue({
        code: "custom",
        path: ['correctAnswer'],
        message: 'You must provide a correct answer',
      });
    }
})
export type QuestionWithCorrectAnswer = z.infer<typeof QuestionWithCorrectAnswerSchema>;

// Question schema displayed to user during attempt
// Contains question with user's current answer (optional)
export const QuestionWithUserAnswerSchema = QuestionWrapperBase.extend({
  userAnswer: AnswerSchema.optional(),
  options: z.array(AnswerOptionSchema).optional(),
});
export type QuestionWithUserAnswer = z.infer<typeof QuestionWithUserAnswerSchema>;

// Question result after submission
// Shows correct answer, user's answer, and outcome (correct/incorrect/skipped)
export const QuestionResultSchema = QuestionWithCorrectAnswerSchema.extend({
  answerOutcome: AnswerOutcomeSchema,
  userAnswer: AnswerSchema.optional(),
});
export type QuestionResult = z.infer<typeof QuestionResultSchema>;

// Client request to update a single answer
export const UpdateAnswerRequest = z.object({
  id: z.uuid(),
  userAnswer: AnswerSchema.optional(),
});
export type UpdateAnswerRequest = z.infer<typeof UpdateAnswerRequest>;