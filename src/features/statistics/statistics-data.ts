import type { CreatedTest, TestAttempt, TestStats } from "./types"

export const CREATED_TESTS: CreatedTest[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    category: "JavaScript",
    totalQuestions: 30,
    passingScore: 70,
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "React Component Patterns",
    category: "React",
    totalQuestions: 25,
    passingScore: 65,
    createdAt: "2026-01-20T14:30:00Z",
  },
  {
    id: "4",
    title: "TypeScript Advanced Types",
    category: "TypeScript",
    totalQuestions: 22,
    passingScore: 70,
    createdAt: "2026-02-01T11:00:00Z",
  },
  {
    id: "6",
    title: "SQL & Database Basics",
    category: "Databases",
    totalQuestions: 20,
    passingScore: 60,
    createdAt: "2026-02-05T08:00:00Z",
  },
]

const FIRST_NAMES = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "James",
  "Mia",
  "Logan",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Alex",
]

function generateAttempts(
  testId: string,
  count: number,
  passingScore: number,
  totalPoints: number
): TestAttempt[] {
  const attempts: TestAttempt[] = []
  const baseDate = new Date("2026-01-20T08:00:00Z")

  for (let i = 0; i < count; i++) {
    const score = Math.round(Math.max(15, Math.min(100, 55 + (Math.random() - 0.3) * 60)))
    const pointsEarned = Math.round((score / 100) * totalPoints)
    const timeTaken = Math.round(300 + Math.random() * 2400) // 5 to 45 min
    const date = new Date(baseDate.getTime() + i * 86400000 * (0.5 + Math.random()))
    const isAnonymous = Math.random() < 0.15

    attempts.push({
      id: `${testId}-attempt-${i + 1}`,
      participant: isAnonymous
        ? null
        : FIRST_NAMES[i % FIRST_NAMES.length] +
          (Math.random() > 0.5 ? ` ${String.fromCharCode(65 + (i % 26))}.` : ""),
      date: date.toISOString(),
      score,
      pointsEarned,
      pointsTotal: totalPoints,
      timeTaken,
      status: score >= passingScore ? "pass" : "fail",
    })
  }

  return attempts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function computeStats(testId: string, attempts: TestAttempt[]): TestStats {
  if (attempts.length === 0) {
    return {
      testId,
      averageScore: 0,
      totalAttempts: 0,
      completionRate: 0,
      passRate: 0,
      averageTime: 0,
    }
  }

  const avgScore = Math.round(
    attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length
  )
  const passCount = attempts.filter((a) => a.status === "pass").length
  const avgTime = Math.round(
    attempts.reduce((sum, a) => sum + a.timeTaken, 0) / attempts.length
  )

  return {
    testId,
    averageScore: avgScore,
    totalAttempts: attempts.length,
    completionRate: Math.round(85 + Math.random() * 15), // simulated
    passRate: Math.round((passCount / attempts.length) * 100),
    averageTime: avgTime,
  }
}

// Pre-generate data for each test
const ATTEMPTS_MAP: Record<string, TestAttempt[]> = {}
const STATS_MAP: Record<string, TestStats> = {}

CREATED_TESTS.forEach((test) => {
  const count = test.id === "1" ? 28 : test.id === "2" ? 18 : test.id === "4" ? 12 : 22
  const totalPoints = test.totalQuestions * 10
  ATTEMPTS_MAP[test.id] = generateAttempts(test.id, count, test.passingScore, totalPoints)
  STATS_MAP[test.id] = computeStats(test.id, ATTEMPTS_MAP[test.id])
})

export function getAttemptsForTest(testId: string): TestAttempt[] {
  return ATTEMPTS_MAP[testId] ?? []
}

export function getStatsForTest(testId: string): TestStats {
  return (
    STATS_MAP[testId] ?? {
      testId,
      averageScore: 0,
      totalAttempts: 0,
      completionRate: 0,
      passRate: 0,
      averageTime: 0,
    }
  )
}

export const ATTEMPTS_PER_PAGE = 8
