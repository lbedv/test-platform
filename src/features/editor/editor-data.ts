import type { MockTest } from "./types"
import type { Question, QuestionType } from "@/types/question"

export { QUESTION_TYPE_LABELS, createDefaultQuestion, createDefaultOptions } from "@/data/shared-test-data"

// Mock test data helpers
function uid() {
  return crypto.randomUUID()
}

function opt(text: string, correct = false) {
  return { id: uid(), text, isCorrect: correct }
}

function q(
  type: QuestionType,
  text: string,
  options: { id: string; text: string; isCorrect: boolean }[],
  correctAnswer = "",
  points = "1"
): Question {
  return { id: uid(), type, text, options, correctAnswer, points }
}

export const MOCK_TESTS: Record<string, MockTest> = {
  "1": {
    settings: {
      title: "JavaScript Fundamentals",
      description:
        "Core concepts including closures, prototypes, and async patterns.",
      category: "JavaScript",
      difficulty: "medium",
      timeLimit: "45",
      maxAttempts: "3",
      randomOrder: true,
      pointsSystem: true,
    },
    questions: [
      q(
        "multiple-choice",
        "What is a closure in JavaScript?",
        [
          opt(
            "A function that has access to its outer scope even after the outer function has returned",
            true
          ),
          opt("A way to close a browser window"),
          opt("A method to end a loop"),
          opt("A syntax for defining classes"),
        ],
        "",
        "2"
      ),
      q(
        "true-false",
        "JavaScript is a statically typed language.",
        [opt("True"), opt("False", true)],
        "",
        "1"
      ),
      q(
        "text-input",
        "What keyword is used to declare a constant variable in modern JavaScript?",
        [],
        "const",
        "1"
      ),
      q(
        "multiple-choice",
        "Which method is used to add an element to the end of an array?",
        [
          opt("unshift()"),
          opt("push()", true),
          opt("pop()"),
          opt("shift()"),
        ],
        "",
        "1"
      ),
      q(
        "numeric",
        "What is the result of typeof null in JavaScript? Enter 0 for 'object', 1 for 'null', 2 for 'undefined'.",
        [],
        "0",
        "2"
      ),
    ],
  },
  "2": {
    settings: {
      title: "React Component Patterns",
      description:
        "Testing knowledge of hooks, context, and component composition.",
      category: "React",
      difficulty: "hard",
      timeLimit: "30",
      maxAttempts: "2",
      randomOrder: false,
      pointsSystem: true,
    },
    questions: [
      q(
        "multiple-choice",
        "Which hook is used for side effects in React?",
        [
          opt("useState"),
          opt("useEffect", true),
          opt("useRef"),
          opt("useMemo"),
        ],
        "",
        "1"
      ),
      q(
        "true-false",
        "React Context can fully replace state management libraries like Redux for all use cases.",
        [opt("True"), opt("False", true)],
        "",
        "1"
      ),
      q(
        "text-input",
        "What React hook returns a mutable ref object?",
        [],
        "useRef",
        "2"
      ),
    ],
  },
  "3": {
    settings: {
      title: "CSS Layout Mastery",
      description: "Flexbox, Grid, and responsive design techniques.",
      category: "CSS",
      difficulty: "easy",
      timeLimit: "",
      maxAttempts: "",
      randomOrder: false,
      pointsSystem: false,
    },
    questions: [
      q(
        "multiple-choice",
        "Which CSS property makes an element a flex container?",
        [
          opt("display: flex", true),
          opt("position: flex"),
          opt("flex: 1"),
          opt("float: flex"),
        ]
      ),
      q(
        "true-false",
        "CSS Grid is only supported in modern browsers released after 2020.",
        [opt("True"), opt("False", true)]
      ),
    ],
  },
  "4": {
    settings: {
      title: "TypeScript Advanced Types",
      description:
        "Generics, conditional types, mapped types, and utility types.",
      category: "TypeScript",
      difficulty: "expert",
      timeLimit: "60",
      maxAttempts: "1",
      randomOrder: true,
      pointsSystem: true,
    },
    questions: [
      q(
        "multiple-choice",
        "What does the 'keyof' operator return?",
        [
          opt("The value of a key"),
          opt("A union of all property names of a type", true),
          opt("The first key of an object"),
          opt("A boolean indicating if a key exists"),
        ],
        "",
        "2"
      ),
      q(
        "text-input",
        "What utility type makes all properties optional?",
        [],
        "Partial",
        "2"
      ),
    ],
  },
  "5": {
    settings: {
      title: "Node.js API Design",
      description:
        "REST principles, middleware patterns, and error handling.",
      category: "Node.js",
      difficulty: "medium",
      timeLimit: "30",
      maxAttempts: "",
      randomOrder: false,
      pointsSystem: false,
    },
    questions: [
      q(
        "multiple-choice",
        "Which HTTP status code indicates a resource was created successfully?",
        [
          opt("200"),
          opt("201", true),
          opt("204"),
          opt("301"),
        ]
      ),
    ],
  },
  "6": {
    settings: {
      title: "SQL & Database Basics",
      description:
        "Joins, indexes, normalization, and query optimization.",
      category: "Databases",
      difficulty: "medium",
      timeLimit: "40",
      maxAttempts: "3",
      randomOrder: false,
      pointsSystem: true,
    },
    questions: [
      q(
        "multiple-choice",
        "Which type of JOIN returns only matching rows from both tables?",
        [
          opt("LEFT JOIN"),
          opt("RIGHT JOIN"),
          opt("INNER JOIN", true),
          opt("FULL OUTER JOIN"),
        ],
        "",
        "1"
      ),
      q(
        "true-false",
        "An index always improves query performance.",
        [opt("True"), opt("False", true)],
        "",
        "1"
      ),
      q(
        "numeric",
        "What is the highest normal form commonly used in practice? (Enter the number only)",
        [],
        "3",
        "2"
      ),
    ],
  },
}

export function getTestById(id: string): MockTest | null {
  return MOCK_TESTS[id] ?? null
}
