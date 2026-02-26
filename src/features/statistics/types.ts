export interface CreatedTest {
  id: string
  title: string
  category: string
  totalQuestions: number
  passingScore: number // percentage
  createdAt: string
}

export interface TestAttempt {
  id: string
  participant: string | null // null = anonymous
  date: string // ISO
  score: number // percentage
  pointsEarned: number
  pointsTotal: number
  timeTaken: number // seconds
  status: "pass" | "fail"
}

export interface TestStats {
  testId: string
  averageScore: number
  totalAttempts: number
  completionRate: number // percentage
  passRate: number
  averageTime: number // seconds
}
