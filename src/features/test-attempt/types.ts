import type { Question, QuestionType } from "@/types/question"

export interface TestData {
  id: string
  title: string
  description: string
  category: string
  difficulty: string
  timeLimit: number | null // in seconds, null = no timer
  totalQuestions: number
  questions: Question[]
}

export interface TestAnswer {
  questionId: string
  type: QuestionType
  selectedOptionId: string | null
  textAnswer: string
}
