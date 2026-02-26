import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterButtonProps {
  label: string
  active: boolean
  onClick: () => void
  count: number
}

export function FilterButton({
  label,
  active,
  onClick,
  count,
}: FilterButtonProps) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 gap-1.5 text-xs",
        active
          ? ""
          : "text-muted-foreground"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0 text-[10px] font-semibold",
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </span>
    </Button>
  )
}
