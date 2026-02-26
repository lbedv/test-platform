import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { FileText, PlusCircle, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/common"

interface CatalogEmptyProps {
  hasFilters: boolean
  onClearFilters: () => void
}

const iconWrapperSm = "flex h-12 w-12 items-center justify-center rounded-xl bg-muted [&>svg]:h-6 [&>svg]:w-6"
const iconWrapperPrimary = "flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-primary"

export function CatalogEmpty({ hasFilters, onClearFilters }: CatalogEmptyProps) {
  const navigate = useNavigate()
  if (hasFilters) {
    return (
      <EmptyState
        icon={<SearchX />}
        title="No tests match your filters"
        description="Try adjusting your search or filter criteria."
        action={
          <Button variant="outline" size="sm" onClick={onClearFilters} className="bg-transparent">
            Clear all filters
          </Button>
        }
        className="rounded-lg"
        iconWrapperClassName={iconWrapperSm}
        titleClassName="text-base font-medium text-foreground"
      />
    )
  }

  return (
    <EmptyState
      icon={<FileText />}
      title="No tests yet"
      description="Create your first test to get started."
      action={
        <Button onClick={() => navigate({ to: PathConstants.MY_TESTS })} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Test
        </Button>
      }
      className="rounded-lg"
      iconWrapperClassName={iconWrapperPrimary}
      titleClassName="text-base font-medium text-foreground"
    />
  )
}
