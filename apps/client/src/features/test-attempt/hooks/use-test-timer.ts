import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for managing countdown timer during test attempts.
 * Tracks remaining time and triggers callback when time runs out.
 * @param startedAt - ISO string of when the test started
 * @param timeLimitSeconds - Total time limit in seconds
 * @param onTimeUp - Optional callback when time reaches zero
 * @returns Object with time state and formatted time string
 */
export function useTestTimer(
  startedAt: string | undefined, 
  timeLimitSeconds: number,
  onTimeUp?: () => void
) {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!startedAt) return timeLimitSeconds;
    
    const startTimeMs = new Date(startedAt).getTime();
    const endTimeMs = startTimeMs + timeLimitSeconds * 1000;
    const initialNowMs = Date.now();
    
    return Math.max(0, Math.floor((endTimeMs - initialNowMs) / 1000));
  });
  
  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!startedAt) return;

    const startTimeMs = new Date(startedAt).getTime();
    const endTimeMs = startTimeMs + timeLimitSeconds * 1000;
    
    const currentNowMs = Date.now();
    const currentRemaining = Math.max(0, Math.floor((endTimeMs - currentNowMs) / 1000));

    if (currentRemaining === 0) {
      onTimeUpRef.current?.();
      return; 
    }

    const intervalId = setInterval(() => {
      const nowMs = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((endTimeMs - nowMs) / 1000));
      
      setTimeLeft(remainingSeconds);

      if (remainingSeconds === 0) {
        clearInterval(intervalId); 
        onTimeUpRef.current?.();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startedAt, timeLimitSeconds]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    timeLeft,
    isTimeUp: timeLeft === 0,
    formattedTime: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  };
}