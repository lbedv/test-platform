/**
 * Mock data handlers – keyed by "METHOD endpoint-pattern".
 * When the real API is unreachable, `apiFetch` falls back here.
 *
 * Each handler receives the parsed URL and request body and returns a
 * JSON-serializable value that matches the API contract.
 */

import type { DashboardStatDTO, UserProfileDTO } from "@/features/dashboard/api/dashboard-api"
import type { Attempt } from "@/features/dashboard/types"
import type { CatalogResponse } from "@/features/catalog/api/catalog-api"
import type { CatalogTest } from "@/features/catalog/types"
import type { UserTest } from "@/features/my-tests/types"
import type { AuthResponse } from "@/features/auth/api/auth-api"
import type { UserProfile } from "@/features/profile/api/profile-api"
import type { TestForEditResponse } from "@/features/editor/api/editor-api"
import type { StartAttemptResponse, SubmitAttemptResponse } from "@/features/test-attempt/api/attempt-api"
import type { TestResult } from "@/features/test-results/types"
import type { CreatedTest, TestStats, TestAttempt } from "@/features/statistics/types"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const id = (prefix = "") => `${prefix}${crypto.randomUUID().slice(0, 8)}`
const iso = (daysAgo: number) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return d.toISOString()
}
const delay = (ms = 300) => new Promise<void>((r) => setTimeout(r, ms))

// ---------------------------------------------------------------------------
// Seed data (stable across requests inside one session)
// ---------------------------------------------------------------------------
const MOCK_USER = { id: "mock-user-1", fullName: "Demo User", email: "demo@example.com" }

const MOCK_CATALOG_TESTS: CatalogTest[] = [
  {
    id: "cat-1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts.",
    category: "Programming",
    difficulty: "medium",
    questions: 10,
    timeLimit: 15,
    attempts: 24,
    bestScore: 85,
    author: "Demo User",
    ownership: "mine",
    status: "published",
    createdAt: iso(10),
  },
  {
    id: "cat-2",
    title: "React Hooks Deep Dive",
    description: "Explore useEffect, useMemo, useCallback, and custom hooks.",
    category: "Programming",
    difficulty: "hard",
    questions: 8,
    timeLimit: 20,
    attempts: 12,
    bestScore: 72,
    author: "Demo User",
    ownership: "mine",
    status: "published",
    createdAt: iso(7),
  },
  {
    id: "cat-3",
    title: "World Geography Basics",
    description: "Capitals, continents, and oceans.",
    category: "Science",
    difficulty: "easy",
    questions: 15,
    timeLimit: null,
    attempts: 42,
    bestScore: null,
    author: "Jane Smith",
    ownership: "public",
    status: "published",
    createdAt: iso(30),
  },
  {
    id: "cat-4",
    title: "CSS Grid & Flexbox",
    description: "Master modern CSS layout techniques.",
    category: "Programming",
    difficulty: "medium",
    questions: 12,
    timeLimit: 10,
    attempts: 8,
    bestScore: 90,
    author: "Demo User",
    ownership: "mine",
    status: "published",
    createdAt: iso(3),
  },
]

const MOCK_ATTEMPTS: Attempt[] = [
  {
    id: "att-1",
    testId: "cat-1",
    testTitle: "JavaScript Fundamentals",
    testCategory: "Programming",
    score: 85,
    totalPoints: 100,
    percentage: 85,
    timeTaken: "12:30",
    completedAt: iso(1),
    passed: true,
  },
  {
    id: "att-2",
    testId: "cat-2",
    testTitle: "React Hooks Deep Dive",
    testCategory: "Programming",
    score: 72,
    totalPoints: 100,
    percentage: 72,
    timeTaken: "18:45",
    completedAt: iso(3),
    passed: true,
  },
  {
    id: "att-3",
    testId: "cat-3",
    testTitle: "World Geography Basics",
    testCategory: "Science",
    score: 60,
    totalPoints: 100,
    percentage: 60,
    timeTaken: "8:15",
    completedAt: iso(5),
    passed: false,
  },
]

const MOCK_MY_TESTS: UserTest[] = [
  {
    id: "cat-1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts.",
    status: "published",
    questions: 10,
    attempts: 24,
    createdAt: iso(10),
  },
  {
    id: "cat-2",
    title: "React Hooks Deep Dive",
    description: "Explore useEffect, useMemo, useCallback, and custom hooks.",
    status: "published",
    questions: 8,
    attempts: 12,
    createdAt: iso(7),
  },
  {
    id: id("draft-"),
    title: "TypeScript Advanced",
    description: "Generics, conditional types, and utility types.",
    status: "draft",
    questions: 5,
    attempts: 0,
    createdAt: iso(1),
  },
]

const MOCK_QUESTIONS = [
  {
    id: "q1",
    type: "multiple-choice" as const,
    text: "Which keyword declares a block-scoped variable in JavaScript?",
    options: [
      { id: "o1", text: "var", isCorrect: false },
      { id: "o2", text: "let", isCorrect: true },
      { id: "o3", text: "const", isCorrect: false },
      { id: "o4", text: "Both let and const", isCorrect: false },
    ],
    correctAnswer: "let",
    points: "10",
  },
  {
    id: "q2",
    type: "true-false" as const,
    text: "JavaScript is a statically typed language.",
    options: [
      { id: "tf1", text: "True", isCorrect: false },
      { id: "tf2", text: "False", isCorrect: true },
    ],
    correctAnswer: "False",
    points: "10",
  },
  {
    id: "q3",
    type: "text-input" as const,
    text: "What method converts a JSON string into a JavaScript object?",
    options: [],
    correctAnswer: "JSON.parse",
    points: "10",
  },
]

const MOCK_STATS_DASHBOARD: DashboardStatDTO[] = [
  { key: "tests-taken", title: "Tests Taken", value: "12", description: "Total completed tests" },
  { key: "avg-score", title: "Average Score", value: "78%", description: "Across all attempts" },
  { key: "tests-created", title: "Tests Created", value: "3", description: "Published & drafts" },
  { key: "streak", title: "Current Streak", value: "5 days", description: "Keep it up!" },
]

const MOCK_TEST_RESULT: TestResult = {
  testTitle: "JavaScript Fundamentals",
  testCategory: "Programming",
  testDifficulty: "medium",
  totalQuestions: 3,
  correctCount: 2,
  incorrectCount: 1,
  unansweredCount: 0,
  totalPoints: 30,
  earnedPoints: 20,
  percentage: 67,
  timeTaken: 450,
  timeLimit: 900,
  questions: [
    {
      questionNumber: 1,
      questionText: "Which keyword declares a block-scoped variable?",
      questionType: "multiple-choice",
      userAnswer: "let",
      correctAnswer: "let",
      isCorrect: true,
      pointsEarned: 10,
      pointsPossible: 10,
    },
    {
      questionNumber: 2,
      questionText: "JavaScript is a statically typed language.",
      questionType: "true-false",
      userAnswer: "False",
      correctAnswer: "False",
      isCorrect: true,
      pointsEarned: 10,
      pointsPossible: 10,
    },
    {
      questionNumber: 3,
      questionText: "What method converts a JSON string into a JavaScript object?",
      questionType: "text-input",
      userAnswer: "JSON.stringify",
      correctAnswer: "JSON.parse",
      isCorrect: false,
      pointsEarned: 0,
      pointsPossible: 10,
    },
  ],
}

const MOCK_CREATED_TESTS: CreatedTest[] = [
  { id: "cat-1", title: "JavaScript Fundamentals", category: "Programming", totalQuestions: 10, passingScore: 70, createdAt: iso(10) },
  { id: "cat-2", title: "React Hooks Deep Dive", category: "Programming", totalQuestions: 8, passingScore: 60, createdAt: iso(7) },
]

function buildStatsForTest(testId: string): TestStats {
  return { testId, averageScore: 76, totalAttempts: 18, completionRate: 92, passRate: 78, averageTime: 720 }
}

function buildAttemptsForTest(_testId: string): TestAttempt[] {
  return [
    { id: "ta-1", participant: "Alice", date: iso(1), score: 90, pointsEarned: 90, pointsTotal: 100, timeTaken: 600, status: "pass" },
    { id: "ta-2", participant: "Bob", date: iso(2), score: 55, pointsEarned: 55, pointsTotal: 100, timeTaken: 840, status: "fail" },
    { id: "ta-3", participant: null, date: iso(4), score: 72, pointsEarned: 72, pointsTotal: 100, timeTaken: 720, status: "pass" },
  ]
}

// ---------------------------------------------------------------------------
// Route matcher
// ---------------------------------------------------------------------------
interface MockRoute {
  method: string
  pattern: RegExp
  handler: (match: RegExpMatchArray, body: unknown) => unknown
}

const routes: MockRoute[] = [
  // Auth
  {
    method: "POST",
    pattern: /^\/auth\/login$/,
    handler: (): AuthResponse => ({ token: "mock-jwt-token", user: MOCK_USER }),
  },
  {
    method: "POST",
    pattern: /^\/auth\/register$/,
    handler: (_m, body): AuthResponse => {
      const b = body as { fullName?: string; email?: string } | null
      return { token: "mock-jwt-token", user: { ...MOCK_USER, fullName: b?.fullName ?? MOCK_USER.fullName, email: b?.email ?? MOCK_USER.email } }
    },
  },

  // Dashboard
  { method: "GET", pattern: /^\/dashboard\/stats$/, handler: (): DashboardStatDTO[] => MOCK_STATS_DASHBOARD },
  { method: "GET", pattern: /^\/dashboard\/attempts$/, handler: (): Attempt[] => MOCK_ATTEMPTS },

  // User / Profile
  {
    method: "GET",
    pattern: /^\/users\/me$/,
    handler: (): UserProfileDTO => ({ fullName: MOCK_USER.fullName, email: MOCK_USER.email, registeredAt: iso(60) }),
  },
  {
    method: "PUT",
    pattern: /^\/users\/me$/,
    handler: (_m, body): UserProfile => {
      const b = body as { fullName?: string; email?: string } | null
      return { fullName: b?.fullName ?? MOCK_USER.fullName, email: b?.email ?? MOCK_USER.email, registeredAt: iso(60) }
    },
  },
  { method: "PUT", pattern: /^\/users\/me\/password$/, handler: (): undefined => undefined },

  // Catalog
  {
    method: "GET",
    pattern: /^\/catalog/,
    handler: (): CatalogResponse => ({
      items: MOCK_CATALOG_TESTS,
      total: MOCK_CATALOG_TESTS.length,
      page: 1,
      totalPages: 1,
    }),
  },

  // My Tests
  { method: "GET", pattern: /^\/tests\/mine$/, handler: (): UserTest[] => MOCK_MY_TESTS },
  { method: "DELETE", pattern: /^\/tests\/[^/]+$/, handler: (): undefined => undefined },

  // Editor
  {
    method: "GET",
    pattern: /^\/tests\/([^/]+)\/edit$/,
    handler: (m): TestForEditResponse => ({
      settings: {
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of core JavaScript concepts.",
        category: "Programming",
        difficulty: "medium",
        timeLimit: "15",
        maxAttempts: "3",
        randomOrder: false,
        pointsSystem: true,
      },
      questions: MOCK_QUESTIONS,
      status: m[1].startsWith("draft") ? "draft" : "published",
    }),
  },
  { method: "POST", pattern: /^\/tests$/, handler: (): { id: string } => ({ id: id("new-") }) },
  { method: "PUT", pattern: /^\/tests\/[^/]+$/, handler: (): undefined => undefined },
  { method: "PATCH", pattern: /^\/tests\/[^/]+\/publish$/, handler: (): undefined => undefined },

  // Attempts
  {
    method: "POST",
    pattern: /^\/attempts$/,
    handler: (): StartAttemptResponse => ({
      attemptId: id("attempt-"),
      test: {
        id: "cat-1",
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of core JavaScript concepts.",
        category: "Programming",
        difficulty: "medium",
        timeLimit: 900,
        totalQuestions: 3,
        questions: MOCK_QUESTIONS,
      },
    }),
  },
  {
    method: "POST",
    pattern: /^\/attempts\/([^/]+)\/submit$/,
    handler: (): SubmitAttemptResponse => ({ resultId: id("result-") }),
  },

  // Results
  {
    method: "GET",
    pattern: /^\/attempts\/([^/]+)\/results$/,
    handler: (): TestResult => MOCK_TEST_RESULT,
  },

  // Statistics
  { method: "GET", pattern: /^\/tests\/mine\/published$/, handler: (): CreatedTest[] => MOCK_CREATED_TESTS },
  {
    method: "GET",
    pattern: /^\/tests\/([^/]+)\/stats$/,
    handler: (m): TestStats => buildStatsForTest(m[1]),
  },
  {
    method: "GET",
    pattern: /^\/tests\/([^/]+)\/attempts$/,
    handler: (m): TestAttempt[] => buildAttemptsForTest(m[1]),
  },
]

// ---------------------------------------------------------------------------
// Public lookup
// ---------------------------------------------------------------------------

/**
 * Attempts to find a matching mock handler for the given method + endpoint.
 * Returns the mock data after a small artificial delay, or `null` if no
 * handler matches (the caller should re-throw the original error).
 */
export async function getMockResponse<T>(
  method: string,
  endpoint: string,
  body?: unknown,
): Promise<T | null> {
  const m = method.toUpperCase()
  // Strip query string for matching
  const path = endpoint.split("?")[0]

  for (const route of routes) {
    if (route.method !== m) continue
    const match = path.match(route.pattern)
    if (match) {
      await delay()
      return route.handler(match, body) as T
    }
  }

  return null
}
