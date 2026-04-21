import { useCallback } from "react";
import type { GridQuestion } from "../types";
import { QUESTIONS_PER_BLOCK } from "../constants";
import type { QuestionWithUserAnswer } from "@test-platform/shared/schemas";

export function useQuestionGrid(
  questionsFromDB: QuestionWithUserAnswer[],
  currentIndex: number,
  setSafeCurrentIndex: (value: number | ((prev: number) => number)) => void
) {
  const currentBlockIndex = Math.floor(currentIndex / QUESTIONS_PER_BLOCK); 
  const startIndex = currentBlockIndex * QUESTIONS_PER_BLOCK;
  const endIndex = startIndex + QUESTIONS_PER_BLOCK;

  const currentGridQuestions = questionsFromDB
    .slice(startIndex, endIndex)
    .map((q, idx): GridQuestion => ({
      id: q.id,
      number: q.questionNumber,
      originalIndex: startIndex + idx,
    }));

  const blocksCount = Math.ceil(questionsFromDB.length / QUESTIONS_PER_BLOCK);

  const goToNextBlock = useCallback(() => {
    setSafeCurrentIndex(startIndex + QUESTIONS_PER_BLOCK);
  }, [setSafeCurrentIndex, startIndex]);

  const goToPrevBlock = useCallback(() => {
    setSafeCurrentIndex(startIndex - QUESTIONS_PER_BLOCK);
  }, [setSafeCurrentIndex, startIndex]);

  const onSelectQuestion = useCallback((index: number) => {
    setSafeCurrentIndex(index);
  }, [setSafeCurrentIndex]);

  return {
    currentBlockIndex,
    blocksCount,
    currentGridQuestions,
    goToNextBlock,
    goToPrevBlock,
    onSelectQuestion
  };
}