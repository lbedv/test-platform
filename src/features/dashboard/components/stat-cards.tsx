import { StatCard } from "./stat-card"
import { STAT_ICON_MAP, DEFAULT_STAT_ICON } from "../dashboard-data"
import { useDashboardStats } from "../hooks/use-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export function StatCards() {
  const { data: stats, isLoading, isError } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-xl" />
        ))}
      </div>
    )
  }

  if (isError || !stats) {
    return (
      <p className="text-sm text-destructive">Failed to load dashboard stats.</p>
    )
  }

  const items = stats.map((s) => {
    const iconCfg = STAT_ICON_MAP[s.key] ?? DEFAULT_STAT_ICON
    return {
      title: s.title,
      value: s.value,
      description: s.description,
      ...iconCfg,
    }
  })

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </div>
  )
}
