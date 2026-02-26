import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  const content = (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )

  if (children) {
    return (
      <div
        className={cn(
          "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        {content}
        {children}
      </div>
    )
  }

  return <div className={cn(className)}>{content}</div>
}
