import { StatCard } from "./stat-card"
import { STAT_ICON_MAP } from "../constants"
import type { DashboardStats } from "../types"
import { formatRelativeTime } from "@/shared/lib/date"

interface StatsPanelProps {
  stats: DashboardStats
}

const STAT_ITEMS = [
  { key: "totalTestsTaken", format: (s: DashboardStats) => String(s.totalTestsTaken) },
  { key: "averageScore",    format: (s: DashboardStats) => `${s.averageScore}%` },
  { key: "testsCreated",    format: (s: DashboardStats) => String(s.testsCreated) },
  { key: "recentActivity",  format: (s: DashboardStats) => s.recentActivity ? formatRelativeTime(s.recentActivity) : "No activity yet" },
] as const;

/**
 * StatsPanel component - Renders a grid of dashboard statistics with loading and error states.
 * Maps stat data from the hook to StatCard components with appropriate icons from STAT_ICON_MAP.
 */
export function StatsPanel({ stats }: StatsPanelProps) {

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STAT_ITEMS.map((item) => (
        <StatCard
          key={item.key}
          value={item.format(stats)}
          {...STAT_ICON_MAP[item.key]}
        />
      ))}
    </div>
  )
}