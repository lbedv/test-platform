import { Badge } from "@/components/ui/badge"
import type { TestStatus } from "@/types/test"

interface StatusBadgeProps {
  status: TestStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "published") {
    return (
      <Badge className="border-transparent bg-success/15 text-success hover:bg-success/20">
        Published
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-muted-foreground">
      Draft
    </Badge>
  )
}
