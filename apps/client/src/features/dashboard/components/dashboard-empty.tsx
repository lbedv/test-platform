import { History } from "lucide-react"
import { EmptyState } from "@/components/common/empty-state"

/**
 * DashboardEmpty component - Displays an empty state when there are no recent attempts.
 */
export function DashboardEmpty() {
  return (
    <EmptyState
      icon={<History />}
      title="No recent attempts"
      description="Your latest test results and in-progress attempts will appear here once you start learning."
      className="py-8 border-none bg-muted/30" 
      iconWrapperClassName="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm"
      titleClassName="text-base font-medium text-foreground"
    />
  )
}