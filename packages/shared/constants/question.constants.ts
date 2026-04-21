import { z } from 'zod';

export const QUESTION_TYPES = [
  'numeric', 
  'trueFalse', 
  'multipleChoice', 
  'textInput'
] as const;

export const ANSWER_OUTCOME = [
  "correct",
  "incorrect",
  "skipped",
] as const;

export const QuestionTypeSchema = z.enum(QUESTION_TYPES);
export const AnswerOutcomeSchema = z.enum(ANSWER_OUTCOME);

export type QuestionType = z.infer<typeof QuestionTypeSchema>;
export type AnswerOutcome = z.infer<typeof AnswerOutcomeSchema>;
