// Question type and answer outcome constants
// Defines available question formats and how answers are evaluated
import { z } from 'zod';

// Question types supported by the platform
export const QUESTION_TYPES = [
  'numeric',        // Numeric/math answer
  'trueFalse',      // Boolean true/false
  'multipleChoice', // Select from options
  'textInput'       // Free text answer
] as const;

// Possible outcomes when evaluating an answer
export const ANSWER_OUTCOME = [
  "correct",   // Answer matches expected response
  "incorrect", // Answer does not match
  "skipped",   // Question was not attempted
] as const;

// Zod schemas for validation
export const QuestionTypeSchema = z.enum(QUESTION_TYPES);
export const AnswerOutcomeSchema = z.enum(ANSWER_OUTCOME);

// TypeScript types inferred from Zod schemas
export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type AnswerOutcome = z.infer<typeof AnswerOutcomeSchema>;
