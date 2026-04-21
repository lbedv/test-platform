/**
 * Empty state component displayed when no data is available.
 * Shows icon, title, description, and optional action button.
 * Customizable appearance through className props.
 */
import { cn } from "@/shared/lib/utils"

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  iconWrapperClassName?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function EmptyState({
  icon,
  title,
  description,
  className,
  iconWrapperClassName = "flex h-14 w-14 items-center justify-center rounded-2xl bg-muted",
  titleClassName = "text-lg font-semibold text-foreground",
  descriptionClassName,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-16 text-center",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center [&>svg]:h-7 [&>svg]:w-7 [&>svg]:text-muted-foreground",
          iconWrapperClassName
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className={cn(titleClassName)}>{title}</h2>
        <p
          className={cn(
            "max-w-xs text-sm text-muted-foreground",
            descriptionClassName
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
