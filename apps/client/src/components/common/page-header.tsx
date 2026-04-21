/**
 * Reusable page header component.
 * Displays title, optional description, and optional action buttons/controls.
 * Responsive layout: stacks on mobile, rows on desktop.
 */

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode  // Action buttons or controls on the right
}

export function PageHeader({
  title,
  description,
  children,
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

  return children ? (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      {content}
      {children}
    </div>
  ) : (
    content
  )
}
