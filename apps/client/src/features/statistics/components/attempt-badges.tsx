import { Badge } from "@/components/ui/badge"

export function AttemptScoreBadge({ score }: { score: number }) {
  const className =
    score >= 80
      ? "bg-success/15 text-success border-success/30 hover:bg-success/20"
      : score >= 60
        ? "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20"
        : "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20"

  return <Badge className={className}>{score}%</Badge>
}

export function AttemptResultBadge ({ isPassed }: { isPassed: boolean }) {
  return <Badge
    variant={isPassed ? "default" : "destructive"}
    className={
      isPassed
        ? "bg-success text-success-foreground hover:bg-success/90"
        : ""
    }
  >
    {isPassed ? "Pass" : "Fail"}
  </Badge>
}