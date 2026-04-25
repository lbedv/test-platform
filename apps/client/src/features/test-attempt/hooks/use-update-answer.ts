import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import type { UpdateAnswerRequest } from "@test-platform/shared/schemas";
import { updateQuestionAnswer } from "../api/test-attempt-api";

/**
 * Custom hook for debounced answer updates during test attempts.
 * Prevents excessive API calls by debouncing updates per question.
 * @param attemptId - The ID of the test attempt
 * @returns Object with updateAnswer function
 */
export function useUpdateAnswer(attemptId: string) {
  const debounceTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const { mutate } = useMutation({
    mutationFn: (body: UpdateAnswerRequest) => updateQuestionAnswer(attemptId, body),
    onError: (error) => console.error("Failed to save answer:", error),
  });

  useEffect(() => {
    const timers = debounceTimersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const updateAnswer = useCallback((answer: UpdateAnswerRequest) => {
    const existing = debounceTimersRef.current.get(answer.id);
    if (existing) clearTimeout(existing);

    debounceTimersRef.current.set(answer.id, setTimeout(() => {
      mutate(answer);
      debounceTimersRef.current.delete(answer.id);
    }, 500));
  }, [mutate]);

  return { updateAnswer };
}