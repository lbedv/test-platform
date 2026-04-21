import { ChevronDown, ChevronUp } from "lucide-react"
import { TableHead } from "@/components/ui/table"

interface SortTableHeaderProps {
  label: string
  sortKey: string
  currentSortKey: string
  currentSortDir: "asc" | "desc"
  onSort: (key: string) => void
}

export function SortTableHeader({
  label,
  sortKey,
  currentSortKey,
  currentSortDir,
  onSort,
}: SortTableHeaderProps) {
  const isActive = currentSortKey === sortKey
  const isAscending = currentSortDir === "asc"

  return (
    <TableHead>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="inline-flex items-center font-medium hover:text-foreground transition-colors"
      >
        {label}
        {!isActive ? (
          <ChevronDown className="ml-1 inline h-3 w-3 opacity-30" />
        ) : isAscending ? (
          <ChevronUp className="ml-1 inline h-3 w-3 text-primary" />
        ) : (
          <ChevronDown className="ml-1 inline h-3 w-3 text-primary" />
        )}
      </button>
    </TableHead>
  )
}
