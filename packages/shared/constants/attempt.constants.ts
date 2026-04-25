// Attempt status constants and validation schemas
// Defines possible states of a test attempt throughout its lifecycle
import { z } from 'zod';

// Possible states: in_progress (user is actively taking test) or completed (submitted)
export const ATTEMPT_STATUS = [
  "in_progress",
  "completed",
] as const;

// Zod schema for attempt status validation
export const AttemptStatusSchema = z.enum(ATTEMPT_STATUS);
export type AttemptStatus = z.infer<typeof AttemptStatusSchema>;
