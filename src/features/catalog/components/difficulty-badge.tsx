import { Badge } from "@/components/ui/badge"
import type { Difficulty } from "@/types/test"

interface DifficultyBadgeProps {
  difficulty: Difficulty
}

const STYLES: Record<Difficulty, string> = {
  easy: "border-transparent bg-success/15 text-success hover:bg-success/20",
  medium: "border-transparent bg-warning/15 text-warning hover:bg-warning/20",
  hard: "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20",
}

const LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return <Badge className={STYLES[difficulty]}>{LABELS[difficulty]}</Badge>
}
