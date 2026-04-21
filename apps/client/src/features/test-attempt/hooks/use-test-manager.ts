import { useCallback, useState } from "react";
import type { QuestionWithUserAnswer } from "@test-platform/shared/schemas";
import type { Answer } from "../types";
import { useUpdateAnswer } from "./use-update-answer";

export function useTestManager(attemptId: string, questionsFromDB: QuestionWithUserAnswer[]) {

  const { updateAnswer } = useUpdateAnswer(attemptId);
  /**
   * Holds user answers for each question (keyed by questionId).
   * Initialized once from the provided questions.
  */
  const [answersRecord, setAnswersRecord] = useState<Record<string, Answer>>(() => {
    const initialState: Record<string, Answer> = {};

    questionsFromDB.forEach((q) => {
    initialState[q.id] = {
      id: q.id,
      userAnswer: q.userAnswer || undefined,
    };
    });

    return initialState;
  });

  // Store/update answer for a specific question.
const setAnswer = useCallback((answer: Answer) => {
  setAnswersRecord((prev) => {
    const current = prev[answer.id];
    if (!current) return prev;
    return {
      ...prev,
      [answer.id]: { ...current, userAnswer: answer.userAnswer },
    };
  });

  updateAnswer(answer);
}, [updateAnswer]);

  //Index of the currently displayed question.
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionsCount = questionsFromDB.length;
  const currentQuestion = questionsFromDB[currentIndex]

  /**
   * Safe setter that clamps index into valid range.
   * Prevents out-of-bounds access everywhere else.
  */
  const setSafeCurrentIndex = useCallback(
    (value: number | ((prev: number) => number)) => {
      setCurrentIndex((prev) => {
        const next = typeof value === "function" ? value(prev) : value;
        const max = questionsCount - 1;

        return Math.min(Math.max(next, 0), max);
      });
    },
    [questionsCount]
  );

  // Navigation functions to move between questions.
  const goToNextQuestion = useCallback(() => {
    setSafeCurrentIndex((prev) => prev + 1);
  }, [setSafeCurrentIndex]);

  const goToPrevQuestion = useCallback(() => {
    setSafeCurrentIndex((prev) => prev - 1);
  }, [setSafeCurrentIndex]);

  // Derived "answered" state for all questions
  const answeredCount = Object.values(answersRecord).filter(
    (a) => a.userAnswer !== undefined
  ).length;

  const isAnswered = useCallback(
    (questionId: string) => {
      return answersRecord[questionId]?.userAnswer !== undefined;
    },
    [answersRecord]
  );

  return {
    // State
    currentIndex,
    currentQuestion,
    currentAnswer: answersRecord[currentQuestion.id]["userAnswer"],
    // Counts
    questionsCount,
    answeredCount,
    // Handlers
    setAnswer,
    setSafeCurrentIndex,
    goToNextQuestion,
    goToPrevQuestion,
    isAnswered,
  };
};