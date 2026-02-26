export type QuestionType = "multiple-choice" | "true-false" | "text-input" | "numeric"

export interface QuestionOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  options: QuestionOption[]
  correctAnswer: string
  points: string
}
