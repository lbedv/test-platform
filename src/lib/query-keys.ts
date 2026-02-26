export const queryKeys = {
  dashboard: {
    stats: () => ["dashboard", "stats"] as const,
    attempts: () => ["dashboard", "attempts"] as const,
  },
  catalog: {
    list: (filters: Record<string, unknown>) =>
      ["catalog", "list", filters] as const,
  },
  myTests: {
    list: () => ["my-tests", "list"] as const,
    detail: (id: string) => ["my-tests", "detail", id] as const,
  },
  editor: {
    detail: (id: string) => ["editor", "detail", id] as const,
  },
  attempt: {
    detail: (id: string) => ["attempt", "detail", id] as const,
  },
  results: {
    detail: (attemptId: string) => ["results", "detail", attemptId] as const,
  },
  statistics: {
    tests: () => ["statistics", "tests"] as const,
    stats: (testId: string) => ["statistics", "stats", testId] as const,
    attempts: (testId: string) =>
      ["statistics", "attempts", testId] as const,
  },
  profile: {
    me: () => ["profile", "me"] as const,
  },
} as const
