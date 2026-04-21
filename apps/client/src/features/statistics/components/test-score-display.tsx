interface ScoreDisplayProps {
  score: number
}

/**
 * Determines color class based on score percentage:
 * - >= 80: green (success)
 * - >= 60: yellow (warning)
 * - < 60: red (destructive)
 */
function getScoreColor(score: number): string {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

/**
 * Maps score percentage to performance label:
 * - >= 80: Excellent
 * - >= 60: Good
 * - < 60: Needs Improvement
 */
function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Good"
  return "Needs Improvement"
}

/**
 * ScoreDisplay component - Shows score percentage with performance label and colored indicator.
 * Displays score in large font with accompanying text label and performance assessment.
 */
export function TestScoreDisplay({ score }: ScoreDisplayProps) {
  const scoreColor = getScoreColor(score)
  const scoreLabel = getScoreLabel(score)

  return (
    <div className="flex items-center gap-2">
      <span className={`text-3xl font-bold ${scoreColor}`}>
        {score}%
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-muted-foreground">
          Avg. Score
        </span>
        <span className={`text-xs font-semibold ${scoreColor}`}>
          {scoreLabel}
        </span>
      </div>
    </div>
  )
}
