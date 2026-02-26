import { cn } from "@/lib/utils"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick: () => void
  isDanger?: boolean
}

export function NavItem({
  icon,
  label,
  isActive,
  onClick,
  isDanger = false,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full text-left",
        isDanger
          ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          : isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  )
}
