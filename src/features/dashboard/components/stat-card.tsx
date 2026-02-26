import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { StatItem } from "../dashboard-data"

interface StatCardProps {
  stat: StatItem
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {stat.title}
        </CardTitle>
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.iconBg}`}>
          <Icon className={`h-4 w-4 ${stat.iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
      </CardContent>
    </Card>
  )
}
