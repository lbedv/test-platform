import { useState, useCallback, useMemo } from "react"
import { createEmptyAnswer } from "@/data/shared-test-data"
import { useTestTimer } from "./use-test-timer"
import type { TestAnswer, TestData } from "../types"

export function useTestAttemptPage(test: TestData) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<TestAnswer[]>(() =>
    test.questions.map(createEmptyAnswer)
  )
  const [skippedIndices, setSkippedIndices] = useState<Set<number>>(
    () => new Set()
  )
  const { timeRemaining, handleTick, handleTimeUp} = useTestTimer(
    test.timeLimit ?? 0
  )
  const [showFinishDialog, setShowFinishDialog] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const currentQuestion = test.questions[currentIndex]
  const currentAnswer = answers[currentIndex]

  const answeredIndices = useMemo(() => {
    const set = new Set<number>()
    answers.forEach((a, i) => {
      if (a.selectedOptionId !== null || a.textAnswer.trim() !== "") {
        set.add(i)
      }
    })
    return set
  }, [answers])

  const answeredCount = answeredIndices.size
  const progressPercent =
    test.totalQuestions > 0
      ? Math.round((answeredCount / test.totalQuestions) * 100)
      : 0

  const isFirst = currentIndex === 0
  const isLast = currentIndex === test.totalQuestions - 1

  const updateAnswer = useCallback(
    (newAnswer: TestAnswer) => {
      setAnswers((prev) => {
        const copy = [...prev]
        copy[currentIndex] = newAnswer
        return copy
      })
    },
    [currentIndex]
  )

  function goTo(index: number) {
    if (index >= 0 && index < test.totalQuestions) {
      setCurrentIndex(index)
    }
  }

  function handleNext() {
    if (!isLast) {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handlePrev() {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1)
    }
  }

  function handleSkip() {
    setSkippedIndices((prev) => {
      const next = new Set(prev)
      next.add(currentIndex)
      return next
    })
    if (!isLast) {
      setCurrentIndex((i) => i + 1)
    }
  }

  function handleFinish() {
    setShowFinishDialog(true)
  }

  function handleConfirmFinish() {
    setShowFinishDialog(false)
    setIsSubmitted(true)
  }

  return {
    currentIndex,
    answers,
    skippedIndices,
    timeRemaining,
    showFinishDialog,
    isSubmitted,
    currentQuestion,
    currentAnswer,
    answeredIndices,
    answeredCount,
    progressPercent,
    isFirst,
    isLast,
    updateAnswer,
    goTo,
    handleNext,
    handlePrev,
    handleSkip,
    handleFinish,
    handleConfirmFinish,
    handleTimeUp,
    handleTick,
    setShowFinishDialog,
  }
}
