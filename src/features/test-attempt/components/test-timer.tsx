import { useEffect, useRef, useCallback } from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestTimerProps {
  timeRemaining: number
  totalTime: number
  onTimeUp: () => void
  onTick: () => void
}

export function TestTimer({
  timeRemaining,
  totalTime,
  onTimeUp,
  onTick,
}: TestTimerProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => {
    if (timeRemaining <= 1) {
      onTimeUp()
    } else {
      onTick()
    }
  }, [timeRemaining, onTimeUp, onTick])

  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [tick])

  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60
  const isLow = timeRemaining <= 60
  const isCritical = timeRemaining <= 30
  const percentage = (timeRemaining / totalTime) * 100

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-mono font-medium tabular-nums transition-colors",
        isCritical
          ? "border-destructive/50 bg-destructive/10 text-destructive"
          : isLow
            ? "border-warning/50 bg-warning/10 text-warning"
            : "border-border bg-card text-foreground"
      )}
      role="timer"
      aria-live="polite"
      aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
    >
      <Clock
        className={cn(
          "h-4 w-4",
          isCritical
            ? "text-destructive"
            : isLow
              ? "text-warning"
              : "text-muted-foreground"
        )}
      />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
      <div
        className="ml-1 h-1.5 w-16 overflow-hidden rounded-full bg-muted"
        aria-hidden="true"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-linear",
            isCritical
              ? "bg-destructive"
              : isLow
                ? "bg-warning"
                : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
