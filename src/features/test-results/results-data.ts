import type { Question } from "@/types/question"
import type { TestAnswer, TestData } from "../test-attempt/types"
import { DEMO_TEST } from "@/data/shared-test-data"
import { createEmptyAnswer } from "@/data/shared-test-data"
import type { QuestionResult, TestResult } from "./types"

export function getDemoAnswers(): { answers: TestAnswer[]; timeTaken: number } {
  const test = DEMO_TEST
  const answers: TestAnswer[] = test.questions.map((q) => {
    const empty = createEmptyAnswer(q)
    if (q.type === "multiple-choice" || q.type === "true-false") {
      if (q.id === "q3") {
        const wrongOption = q.options.find((o) => !o.isCorrect)
        return { ...empty, selectedOptionId: wrongOption?.id ?? null }
      }
      const correctOption = q.options.find((o) => o.isCorrect)
      return { ...empty, selectedOptionId: correctOption?.id ?? null }
    }
    if (q.type === "text-input") {
      return { ...empty, textAnswer: q.correctAnswer }
    }
    if (q.type === "numeric") {
      return { ...empty, textAnswer: q.correctAnswer }
    }
    return empty
  })
  return { answers, timeTaken: 347 }
}

export function gradeTest(
  test: TestData,
  answers: TestAnswer[],
  timeTaken: number | null
): TestResult {
  let correctCount = 0
  let incorrectCount = 0
  let unansweredCount = 0
  let earnedPoints = 0
  let totalPoints = 0

  const questions: QuestionResult[] = test.questions.map((q: Question, i: number) => {
    const answer = answers[i]
    const pointsPossible = parseInt(q.points, 10) || 0
    totalPoints += pointsPossible

    const { userAnswer, correctAnswer, isCorrect } = evaluateQuestion(q, answer)

    if (!userAnswer || userAnswer === "No answer") {
      unansweredCount++
    } else if (isCorrect) {
      correctCount++
      earnedPoints += pointsPossible
    } else {
      incorrectCount++
    }

    return {
      questionNumber: i + 1,
      questionText: q.text,
      questionType: q.type,
      userAnswer,
      correctAnswer,
      isCorrect,
      pointsEarned: isCorrect ? pointsPossible : 0,
      pointsPossible,
    }
  })

  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0

  return {
    testTitle: test.title,
    testCategory: test.category,
    testDifficulty: test.difficulty,
    totalQuestions: test.totalQuestions,
    correctCount,
    incorrectCount,
    unansweredCount,
    totalPoints,
    earnedPoints,
    percentage,
    timeTaken,
    timeLimit: test.timeLimit,
    questions,
  }
}

function evaluateQuestion(
  question: Question,
  answer: TestAnswer
): { userAnswer: string; correctAnswer: string; isCorrect: boolean } {
  if (question.type === "multiple-choice" || question.type === "true-false") {
    const correctOption = question.options.find((o) => o.isCorrect)
    const selectedOption = answer.selectedOptionId
      ? question.options.find((o) => o.id === answer.selectedOptionId)
      : null

    return {
      userAnswer: selectedOption?.text || "No answer",
      correctAnswer: correctOption?.text || "N/A",
      isCorrect: selectedOption?.isCorrect === true,
    }
  }

  if (question.type === "text-input") {
    const userText = answer.textAnswer.trim()
    const correct = question.correctAnswer.trim()
    return {
      userAnswer: userText || "No answer",
      correctAnswer: correct,
      isCorrect: userText.toLowerCase() === correct.toLowerCase(),
    }
  }

  if (question.type === "numeric") {
    const userText = answer.textAnswer.trim()
    const correct = question.correctAnswer.trim()
    return {
      userAnswer: userText || "No answer",
      correctAnswer: correct,
      isCorrect: userText === correct,
    }
  }

  return { userAnswer: "No answer", correctAnswer: "N/A", isCorrect: false }
}
