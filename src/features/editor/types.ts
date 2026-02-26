import type { Question } from "@/types/question"

export interface TestSettings {
  title: string
  description: string
  category: string
  difficulty: string
  timeLimit: string
  maxAttempts: string
  randomOrder: boolean
  pointsSystem: boolean
}

export interface MockTest {
  settings: TestSettings
  questions: Question[]
}