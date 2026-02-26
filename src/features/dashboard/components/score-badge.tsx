import { Badge } from "@/components/ui/badge"

interface ScoreBadgeProps {
  percentage: number
  passed: boolean
}

export function ScoreBadge({ percentage, passed }: ScoreBadgeProps) {
  if (passed) {
    return (
      <Badge className="border-transparent bg-success/15 text-success hover:bg-success/20">
        {percentage}% Passed
      </Badge>
    )
  }
  return (
    <Badge className="border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20">
      {percentage}% Failed
    </Badge>
  )
}
