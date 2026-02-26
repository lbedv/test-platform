interface ScoreDisplayProps {
  score: number
  label: string
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  return "Needs Improvement"
}

export function ScoreDisplay({ score, label }: ScoreDisplayProps) {
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  return (
    <div className="flex items-center gap-2">
      <span className={`text-3xl font-bold ${scoreColor}`}>
        {score}%
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <span className={`text-xs font-semibold ${scoreColor}`}>
          {scoreLabel}
        </span>
      </div>
    </div>
  )
}
