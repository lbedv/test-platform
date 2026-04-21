import { apiFetch } from "@/shared/lib/api-client";
import { AttemptSummarySchema, UserStatsResponseSchema } from "@test-platform/shared/schemas";

export function fetchCompletedAttempts() {
  return apiFetch("/attempts", {
    method: "GET",
    schema: AttemptSummarySchema.array(), 
  });
}

export function fetchDashboardStats() {
  return apiFetch("/users/me/stats", {
    method: "GET",
    schema: UserStatsResponseSchema,
  });
}