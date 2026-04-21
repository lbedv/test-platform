import type { LucideIcon } from "lucide-react"
import { FileText, TrendingUp, Clock, Award } from "lucide-react"

export const ITEMS_PER_PAGE = 6

/**
 * Maps dashboard stat keys to their corresponding icon and color configuration.
 * Used to display statistics consistently with semantic colors.
 */
export const STAT_ICON_MAP: Record<
  string,
  {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor: string;
    iconBg: string;
  }
> = {
  "totalTestsTaken": {
    title: "Total Tests Taken",
    description: 'All time completed tests',
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  "averageScore": {
    title: "Average Score",
    description: 'Across all users',
    icon: TrendingUp,
    iconColor: "text-success",
    iconBg: "bg-success/10",
  },
  "testsCreated": {
    title: "Tests Created",
    description: 'Total tests created by you',
    icon: Award,
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
  },
  "recentActivity": {
    title: "Recent Activity",
    description: 'Last test taken',
    icon: Clock,
    iconColor: "text-warning",
    iconBg: "bg-warning/10",
  },
}