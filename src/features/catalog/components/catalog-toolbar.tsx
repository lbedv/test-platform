import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { SortOption, TestOwnership } from "../types"
import { CATEGORIES } from "../catalog-data"

interface CatalogToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  difficulty: string
  onDifficultyChange: (value: string) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  ownership: TestOwnership | "all"
  onOwnershipChange: (value: TestOwnership | "all") => void
  resultCount: number
}

export function CatalogToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  difficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
  ownership,
  onOwnershipChange,
  resultCount,
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
        <OwnershipButton
          label="All Tests"
          value="all"
          current={ownership}
          onClick={onOwnershipChange}
        />
        <OwnershipButton
          label="My Tests"
          value="mine"
          current={ownership}
          onClick={onOwnershipChange}
        />
        <OwnershipButton
          label="Public Catalog"
          value="public"
          current={ownership}
          onClick={onOwnershipChange}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tests by title or description..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            aria-label="Search tests"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[160px] bg-card" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficulty} onValueChange={onDifficultyChange}>
            <SelectTrigger className="w-[140px] bg-card" aria-label="Filter by difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
            <SelectTrigger className="w-[150px] bg-card" aria-label="Sort tests by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="attempts">Most Popular</SelectItem>
              <SelectItem value="score">Best Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {resultCount === 1
          ? "1 test found"
          : `${resultCount} tests found`}
      </p>
    </div>
  )
}

function OwnershipButton({
  label,
  value,
  current,
  onClick,
}: {
  label: string
  value: TestOwnership | "all"
  current: TestOwnership | "all"
  onClick: (value: TestOwnership | "all") => void
}) {
  const isActive = current === value
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onClick(value)}
      className={
        isActive
          ? "flex-1 bg-background text-foreground shadow-sm hover:bg-background"
          : "flex-1 text-muted-foreground hover:bg-transparent hover:text-foreground"
      }
    >
      {label}
    </Button>
  )
}
