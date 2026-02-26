import type { QuestionType } from "@/types/question"

export interface QuestionResult {
  questionNumber: number
  questionText: string
  questionType: QuestionType
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  pointsEarned: number
  pointsPossible: number
}

export interface TestResult {
  testTitle: string
  testCategory: string
  testDifficulty: string
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  unansweredCount: number
  totalPoints: number
  earnedPoints: number
  percentage: number
  timeTaken: number | null // seconds
  timeLimit: number | null // seconds
  questions: QuestionResult[]
}
