import type { Difficulty, TestStatus } from "@/types/test"

export interface MockTestBase {
  id: string
  title: string
  description: string
  shortDescription?: string
  extendedDescription?: string
  category: string
  difficulty: Difficulty
  questions: number
  status: TestStatus
}

export const BASE_TESTS: MockTestBase[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description:
      "Core concepts including closures, prototypes, and async patterns.",
    extendedDescription:
      "A comprehensive test covering all essential JavaScript topics.",
    category: "JavaScript",
    difficulty: "medium",
    questions: 30,
    status: "published",
  },
  {
    id: "2",
    title: "React Component Patterns",
    description:
      "Testing knowledge of hooks, context, and component composition.",
    extendedDescription:
      "Covers advanced patterns like render props and HOCs.",
    category: "React",
    difficulty: "hard",
    questions: 25,
    status: "published",
  },
  {
    id: "3",
    title: "CSS Layout Mastery",
    description: "Flexbox, Grid, and responsive design techniques.",
    extendedDescription: "Master modern CSS layout methods.",
    category: "CSS",
    difficulty: "easy",
    questions: 18,
    status: "draft",
  },
  {
    id: "4",
    title: "TypeScript Advanced Types",
    description:
      "Generics, conditional types, mapped types, and utility types.",
    extendedDescription: "Deep dive into TypeScript's type system.",
    category: "TypeScript",
    difficulty: "hard",
    questions: 22,
    status: "published",
  },
  {
    id: "5",
    title: "Node.js API Design",
    description:
      "REST principles, middleware patterns, and error handling.",
    extendedDescription: "Build robust Node.js APIs.",
    category: "Node.js",
    difficulty: "medium",
    questions: 12,
    status: "draft",
  },
  {
    id: "6",
    title: "SQL & Database Basics",
    description:
      "Joins, indexes, normalization, and query optimization.",
    extendedDescription: "Essential database knowledge.",
    category: "Databases",
    difficulty: "easy",
    questions: 20,
    status: "published",
  },
]

// Create date mappings for tests (consistent across all features)
export const TEST_DATES: Record<string, string> = {
  "1": "Jan 15, 2026",
  "2": "Jan 22, 2026",
  "3": "Feb 1, 2026",
  "4": "Feb 3, 2026",
  "5": "Feb 7, 2026",
  "6": "Feb 8, 2026",
}

// Create ISO date mappings for tests
export const TEST_ISO_DATES: Record<string, string> = {
  "1": "2026-01-15T10:00:00Z",
  "2": "2026-01-20T14:30:00Z",
  "3": "2026-01-25T09:00:00Z",
  "4": "2026-02-01T11:00:00Z",
  "5": "2026-02-03T16:00:00Z",
  "6": "2026-02-05T08:00:00Z",
}

// Create attempt counts (consistent across all features)
export const TEST_ATTEMPTS: Record<string, number> = {
  "1": 142,
  "2": 89,
  "3": 0,
  "4": 56,
  "5": 0,
  "6": 73,
}

// Create time limits (in minutes)
export const TEST_TIME_LIMITS: Record<string, number | null> = {
  "1": 45,
  "2": 30,
  "3": 20,
  "4": 35,
  "5": null,
  "6": 25,
}

// Create best scores
export const TEST_BEST_SCORES: Record<string, number | null> = {
  "1": 85,
  "2": 72,
  "3": null,
  "4": 91,
  "5": null,
  "6": 95,
}
