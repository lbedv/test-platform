import type { LucideIcon } from "lucide-react"
import { FileText, TrendingUp, Clock, Award } from "lucide-react"

export interface StatItem {
  title: string
  value: string
  description: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

/** Maps server stat `key` -> icon / color info */
export const STAT_ICON_MAP: Record<
  string,
  { icon: LucideIcon; iconColor: string; iconBg: string }
> = {
  total_tests_taken: {
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  average_score: {
    icon: TrendingUp,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  tests_created: {
    icon: Award,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  recent_activity: {
    icon: Clock,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
}

/** Fallback icon config for unknown stat keys */
export const DEFAULT_STAT_ICON = {
  icon: FileText,
  iconColor: "text-muted-foreground",
  iconBg: "bg-muted/10",
}
