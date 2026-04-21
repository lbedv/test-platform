import { z } from 'zod';

export const ATTEMPT_STATUS = [
  "in_progress",
  "completed",
] as const;

export const AttemptStatusSchema = z.enum(ATTEMPT_STATUS);
export type AttemptStatus = z.infer<typeof AttemptStatusSchema>;
