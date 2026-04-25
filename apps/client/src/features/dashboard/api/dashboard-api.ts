import { apiFetch } from "@/shared/lib/api-client";
import { AttemptSummarySchema, UserStatsResponseSchema } from "@test-platform/shared/schemas";

/**
 * Fetches a list of completed test attempts for the current user.
 * @returns Promise resolving to array of attempt summaries
 */
export function fetchCompletedAttempts() {
  return apiFetch("/attempts", {
    method: "GET",
    schema: AttemptSummarySchema.array(), 
  });
}

/**
 * Fetches dashboard statistics for the current user.
 * @returns Promise resolving to user statistics response
 */
export function fetchDashboardStats() {
  return apiFetch("/users/me/stats", {
    method: "GET",
    schema: UserStatsResponseSchema,
  });
}