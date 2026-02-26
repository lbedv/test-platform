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

// Demo test for preview purposes
export const DEMO_TEST = {
  id: "demo-1",
  title: "Introduction to Web Development",
  description:
    "Test your knowledge on HTML, CSS, and JavaScript fundamentals.",
  category: "Web Development",
  difficulty: "Intermediate",
  timeLimit: 600, // 10 minutes
  totalQuestions: 5,
  questions: [
    {
      id: "q1",
      type: "multiple-choice" as const,
      text: "Which HTML tag is used to define an unordered list?",
      options: [
        { id: "q1-a", text: "<ol>", isCorrect: false },
        { id: "q1-b", text: "<ul>", isCorrect: true },
        { id: "q1-c", text: "<li>", isCorrect: false },
        { id: "q1-d", text: "<list>", isCorrect: false },
      ],
      correctAnswer: "",
      points: "2",
    },
    {
      id: "q2",
      type: "true-false" as const,
      text: "CSS stands for Cascading Style Sheets.",
      options: [
        { id: "q2-a", text: "True", isCorrect: true },
        { id: "q2-b", text: "False", isCorrect: false },
      ],
      correctAnswer: "",
      points: "1",
    },
    {
      id: "q3",
      type: "multiple-choice" as const,
      text: "Which of the following is NOT a JavaScript data type?",
      options: [
        { id: "q3-a", text: "String", isCorrect: false },
        { id: "q3-b", text: "Boolean", isCorrect: false },
        { id: "q3-c", text: "Float", isCorrect: true },
        { id: "q3-d", text: "Undefined", isCorrect: false },
      ],
      correctAnswer: "",
      points: "2",
    },
    {
      id: "q4",
      type: "text-input" as const,
      text: "What CSS property is used to change the text color of an element?",
      options: [],
      correctAnswer: "color",
      points: "2",
    },
    {
      id: "q5",
      type: "numeric" as const,
      text: "How many heading levels are available in HTML (h1 through h?)?",
      options: [],
      correctAnswer: "6",
      points: "1",
    },
  ],
}

export const DEMO_TEST_ATTEMPT = {
  id: "123",
  testId: DEMO_TEST.id
}
