import { useState, useCallback } from "react"

export function useTestTimer(initialTime: number) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTime)

  const handleTick = useCallback(() => {
    setTimeRemaining((t) => Math.max(0, t - 1))
  }, [])

  const handleTimeUp = useCallback(() => {
    setTimeRemaining(0)
  }, [])

  return {
    timeRemaining,
    handleTick,
    handleTimeUp,
  }
}
