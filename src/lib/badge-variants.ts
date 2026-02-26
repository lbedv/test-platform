// Badge variant styles for consistent color coding across the app
export const badgeVariants = {
  // Status badges
  success: "border-transparent bg-success/15 text-success hover:bg-success/20",
  draft: "border transparent bg-muted text-muted-foreground",
  destructive:
    "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20",
  warning:
    "border-transparent bg-warning/15 text-warning hover:bg-warning/20",

  // Question type badges
  "multiple-choice": "border-transparent bg-primary/15 text-primary",
  "true-false": "border-transparent bg-secondary/15 text-secondary",
  "text-input": "border-transparent bg-warning/15 text-warning",
  numeric: "border-transparent bg-destructive/15 text-destructive",

  // Generic
  outline: "border-border text-foreground bg-transparent",
  default: "border-primary/20 bg-primary/10 text-primary",
} as const

export function getStatusBadgeStyle(status: string): string {
  return (
    badgeVariants[status as keyof typeof badgeVariants] ||
    badgeVariants.default
  )
}

export function getDifficultyBadgeStyle(difficulty: string): string {
  const styles: Record<string, string> = {
    easy: "border-transparent bg-success/15 text-success hover:bg-success/20",
    medium:
      "border-transparent bg-warning/15 text-warning hover:bg-warning/20",
    hard: "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20",
    expert:
      "border-transparent bg-destructive/15 text-destructive hover:bg-destructive/20",
  }
  return styles[difficulty] || styles.medium
}
