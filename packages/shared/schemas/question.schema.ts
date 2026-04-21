import { z } from 'zod';
import { QuestionTypeSchema, AnswerOutcomeSchema } from '../constants/question.constants.js';

// Base Shared Schemas
export const AnswerSchema = z.union([
  z.number(),
  z.boolean(),
  z.array(z.string()),
  z.string(),
])
export type AnswerType = z.infer<typeof AnswerSchema>

export const AnswerOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
});
export type AnswerOption = z.infer<typeof AnswerOptionSchema>;

const QuestionWrapperBase = z.object({
  id: z.uuid(),
  questionText: z.string().min(1, "Question text is required"),
  questionNumber: z.number(),
  pointsPossible: z.number().min(1, "Points must be at least 1").max(100, "Points cannot exceed 100"),
  questionType: QuestionTypeSchema,
});

export const QuestionWithCorrectAnswerSchema = QuestionWrapperBase.extend({
  correctAnswer: AnswerSchema,
  options: z.array(AnswerOptionSchema).optional(),
}).superRefine((question, ctx) => {
  // For multiple choice, validate options and correct answer
  const { questionType, correctAnswer, options } = question;


  if (correctAnswer === "" || (typeof correctAnswer === "string" && correctAnswer.trim() === "")) {
    ctx.addIssue({
      code: "custom",
      path: ['correctAnswer'],
      message: 'You must provide a correct answer',
    });
   
    return;
  }


  // Type-specific validation
  switch (questionType) {
    case 'multipleChoice':
      if (!options || options.length < 2) {
        ctx.addIssue({
          code: "custom",
          path: ['options'],
          message: 'Multiple choice questions must have at least 2 options',
        });
      } else if (options.some((opt) => !opt.label || opt.label.trim().length === 0)) {
        ctx.addIssue({
          code: "custom",
          path: ['options'],
          message: 'All options must have labels',
        });
      }


      if (!Array.isArray(correctAnswer) || correctAnswer.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ['correctAnswer'],
          message: 'You must select a correct answer',
        });
      }
      break;


    case 'trueFalse':
      if (typeof correctAnswer !== 'boolean') {
        ctx.addIssue({
          code: "custom",
          path: ['correctAnswer'],
          message: 'Correct answer for true/false questions must be a boolean',
        });
      }
      break;


    case 'numeric':
      if (typeof correctAnswer !== 'number') {
        ctx.addIssue({
          code: "custom",
          path: ['correctAnswer'],
          message: 'Correct answer for numeric questions must be a number',
        });
      }
      break;


    case 'textInput':
      if (typeof correctAnswer !== 'string') {
        ctx.addIssue({
          code: "custom",
          path: ['correctAnswer'],
          message: 'Correct answer for text input questions must be text',
        });
      }
      break;
     
    default:
      break;
  }
});
export type QuestionWithCorrectAnswer = z.infer<typeof QuestionWithCorrectAnswerSchema>;

export const QuestionWithUserAnswerSchema = QuestionWrapperBase.extend({
  userAnswer: AnswerSchema.optional(),
  options: z.array(AnswerOptionSchema).optional(),
});
export type QuestionWithUserAnswer = z.infer<typeof QuestionWithUserAnswerSchema>;

export const QuestionResultSchema = QuestionWithCorrectAnswerSchema.extend({
  answerOutcome: AnswerOutcomeSchema,
  userAnswer: AnswerSchema.optional(),
});
export type QuestionResult = z.infer<typeof QuestionResultSchema>;

export const UpdateAnswerRequest = z.object({
  id: z.uuid(),
  userAnswer: AnswerSchema.optional(),
});
export type UpdateAnswerRequest = z.infer<typeof UpdateAnswerRequest>;