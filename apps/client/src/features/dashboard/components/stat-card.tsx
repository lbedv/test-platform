import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText, type LucideIcon } from "lucide-react"
import { cn } from "@/shared/lib/utils"

interface StatCardProps {
  title: string
  description: string
  value: string
  icon?: LucideIcon
  iconColor?: string
  iconBg?: string
}

/**
 * StatCard component - Displays a single dashboard statistic with icon and label.
 * Shows a numeric value with description text and an icon in a colored background.
 */
export function StatCard({
  title,
  description,
  value,
  icon: Icon = FileText,
  iconColor = "text-muted-foreground",
  iconBg = "bg-muted/10"
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconBg)}>
          <Icon className={cn("h-4 w-4", iconColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}