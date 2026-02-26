import type { TestStatus, Difficulty } from "@/types/test"

export type TestOwnership = "mine" | "public"
export type SortOption = "newest" | "oldest" | "score" | "attempts"

export interface CatalogTest {
  id: string
  title: string
  description: string
  category: string
  difficulty: Difficulty
  questions: number
  timeLimit: number | null // minutes
  attempts: number
  bestScore: number | null // percentage, null if never taken
  author: string
  ownership: TestOwnership
  status: TestStatus
  createdAt: string // ISO date
}
