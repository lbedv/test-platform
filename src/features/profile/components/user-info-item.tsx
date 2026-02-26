import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface UserInfoItemProps {
  icon: LucideIcon
  value: ReactNode
  iconSize?: "sm" | "md"
}

export function UserInfoItem({
  icon: Icon,
  value,
  iconSize = "md",
}: UserInfoItemProps) {
  const iconClass = iconSize === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"
  const textClass = iconSize === "sm" ? "text-xs" : "text-sm"

  return (
    <div className={`flex items-center justify-center gap-1.5 ${textClass} text-muted-foreground`}>
      <Icon className={iconClass} />
      <span>{value}</span>
    </div>
  )
}
