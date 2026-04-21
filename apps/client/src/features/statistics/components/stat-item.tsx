interface StatItemProps {
  icon: React.ElementType
  iconColor: string
  iconBg: string
  label: string
  value: string
}

/**
 * StatItem component - Displays a statistic with icon, label, and numeric value.
 * Used in statistics pages to show metrics like total attempts, average score, etc.
 */
export function StatItem({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
}: StatItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-tight">
          {value}
        </span>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}
