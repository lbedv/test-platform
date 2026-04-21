import type { CatalogFilterRequest} from "@test-platform/shared/schemas"

export const queryKeys = {
  dashboard: {
    stats: () => ["dashboard", "stats"] as const,
    attempts: () => ["dashboard", "attempts"] as const,
  },
  catalog: {
    list: (filters: CatalogFilterRequest) =>
      ["catalog", "list", filters] as const,
  },
  attempt: {
    active: () => ["attempt", "active"] as const,
    detail: (id: string) => ["attempt", "detail", id] as const,
  },
  results: {
    detail: (attemptId: string) => ["results", "detail", attemptId] as const,
  },
  statistics: {
    stats: (testId: string) => ["statistics", "stats", testId] as const,
    attempts: (testId: string) => ["statistics", "attempts", testId] as const,
    userTests: () => ["statistics", "userTests"] as const,
  },
  users: {
    me: () => ["users", "me"] as const,
  },
} as const
