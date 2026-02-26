import { BASE_TESTS, TEST_ATTEMPTS, TEST_TIME_LIMITS, TEST_BEST_SCORES, TEST_ISO_DATES } from "@/data/mock-tests"
import type { CatalogTest } from "./types"

export const CATEGORIES = [
  "All Categories",
  "Web Development",
  "JavaScript",
  "TypeScript",
  "React",
  "CSS",
  "Node.js",
  "Databases",
  "DevOps",
  "General Knowledge",
] as const

// Convert BASE_TESTS to catalog format for owned tests
const OWNED_TESTS: CatalogTest[] = BASE_TESTS.map((test) => ({
  id: test.id,
  title: test.title,
  description: `${test.description} ${test.extendedDescription || ""}`.trim(),
  category: test.category,
  difficulty: test.difficulty,
  questions: test.questions,
  timeLimit: TEST_TIME_LIMITS[test.id] ?? null,
  attempts: TEST_ATTEMPTS[test.id] ?? 0,
  bestScore: TEST_BEST_SCORES[test.id] ?? null,
  author: "You",
  ownership: "mine",
  status: test.status,
  createdAt: TEST_ISO_DATES[test.id] ?? new Date().toISOString(),
}))

// Public tests from other authors
const PUBLIC_TESTS: CatalogTest[] = [
  {
    id: "pub-1",
    title: "HTML5 Semantic Elements",
    description:
      "Test your understanding of semantic HTML5 elements and their proper usage in modern web development.",
    category: "Web Development",
    difficulty: "easy",
    questions: 15,
    timeLimit: 15,
    attempts: 312,
    bestScore: null,
    author: "Sarah Chen",
    ownership: "public",
    status: "published",
    createdAt: "2026-01-10T12:00:00Z",
  },
  {
    id: "pub-2",
    title: "Advanced React Hooks",
    description:
      "Deep dive into useReducer, useMemo, useCallback, and custom hooks. For experienced React developers.",
    category: "React",
    difficulty: "hard",
    questions: 20,
    timeLimit: 40,
    attempts: 198,
    bestScore: 68,
    author: "Mike Torres",
    ownership: "public",
    status: "published",
    createdAt: "2026-01-18T15:30:00Z",
  },
  {
    id: "pub-3",
    title: "Git & Version Control",
    description:
      "Branching strategies, merge conflicts, rebasing, and collaborative workflows using Git.",
    category: "DevOps",
    difficulty: "medium",
    questions: 18,
    timeLimit: 20,
    attempts: 456,
    bestScore: null,
    author: "Alex Rivera",
    ownership: "public",
    status: "published",
    createdAt: "2026-01-22T10:00:00Z",
  },
  {
    id: "pub-4",
    title: "CSS Animations & Transitions",
    description:
      "Keyframes, transforms, transition timing, and performance considerations for smooth CSS animations.",
    category: "CSS",
    difficulty: "medium",
    questions: 16,
    timeLimit: 25,
    attempts: 87,
    bestScore: 78,
    author: "Jordan Lee",
    ownership: "public",
    status: "published",
    createdAt: "2026-02-02T09:00:00Z",
  },
  {
    id: "pub-5",
    title: "JavaScript ES6+ Features",
    description:
      "Arrow functions, destructuring, modules, generators, symbols, and other modern JavaScript features.",
    category: "JavaScript",
    difficulty: "easy",
    questions: 24,
    timeLimit: 30,
    attempts: 521,
    bestScore: null,
    author: "Priya Patel",
    ownership: "public",
    status: "published",
    createdAt: "2026-02-04T14:00:00Z",
  },
  {
    id: "pub-6",
    title: "Docker Fundamentals",
    description:
      "Containers, images, Dockerfiles, networking, and compose for local development environments.",
    category: "DevOps",
    difficulty: "medium",
    questions: 20,
    timeLimit: 30,
    attempts: 234,
    bestScore: null,
    author: "Chris Wu",
    ownership: "public",
    status: "published",
    createdAt: "2026-02-06T11:00:00Z",
  },
]

export const DEMO_CATALOG: CatalogTest[] = [...OWNED_TESTS, ...PUBLIC_TESTS]

export const ITEMS_PER_PAGE = 6
