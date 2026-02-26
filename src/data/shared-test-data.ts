import type { Question, QuestionType } from "@/types/question"

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  "multiple-choice": "Multiple Choice",
  "true-false": "True / False",
  "text-input": "Text Input",
  numeric: "Numeric",
}

export function createDefaultQuestion(): Question {
  return {
    id: crypto.randomUUID(),
    type: "multiple-choice",
    text: "",
    options: [
      { id: crypto.randomUUID(), text: "", isCorrect: false },
      { id: crypto.randomUUID(), text: "", isCorrect: false },
    ],
    correctAnswer: "",
    points: "1",
  }
}

export function createDefaultOptions(type: QuestionType) {
  if (type === "true-false") {
    return [
      { id: crypto.randomUUID(), text: "True", isCorrect: false },
      { id: crypto.randomUUID(), text: "False", isCorrect: false },
    ]
  }
  if (type === "multiple-choice") {
    return [
      { id: crypto.randomUUID(), text: "", isCorrect: false },
      { id: crypto.randomUUID(), text: "", isCorrect: false },
    ]
  }
  return []
}

export function createEmptyAnswer(q: Question): {
  questionId: string
  type: QuestionType
  selectedOptionId: string | null
  textAnswer: string
} {
  return {
    questionId: q.id,
    type: q.type,
    selectedOptionId: null,
    textAnswer: "",
  }
}
