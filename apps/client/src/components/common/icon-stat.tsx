import { cn } from "@/shared/lib/utils"

interface IconStatProps {
  icon: React.ReactNode
  value: string | number
  className?: string
}

/**
 * A simple component that displays an icon alongside a value. 
 * typically used for showing stats or metadata in a compact form.
 */
export function IconStat({
  icon,
  value,
  className,
}: IconStatProps) {
  return (
    <span className={cn("flex items-center gap-1.5 text-xs text-muted-foreground", className)}>
      <span className="h-3.5 w-3.5 shrink-0">{icon}</span>
      {value}
    </span>
  )
}
