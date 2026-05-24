import { cn } from "@/shared/lib/utils"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}

/**
 * NavItem component - Represents a single navigation item in the mobile header's side sheet.
 * Calls onClick when clicked to navigate or perform an action.
 */
export function NavItem({
  icon,
  label,
  isActive,
  onClick,
}: NavItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full text-left cursor-pointer",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </div>
  )
}