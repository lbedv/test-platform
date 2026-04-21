import { FileText } from "lucide-react"
import { EmptyState } from "@/components/common"

/**
 * CSS class strings for styling icon wrappers in empty states
 */
const iconWrapperPrimary = "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-primary"

export function CatalogEmpty() {
  return (
    <EmptyState
      icon={<FileText />}
      title="No tests found"
      description="Create your own tests to see it appear here."
      className="rounded-lg border-0"
      iconWrapperClassName={iconWrapperPrimary}
      titleClassName="text-base font-medium text-foreground"
    />
  )
}
