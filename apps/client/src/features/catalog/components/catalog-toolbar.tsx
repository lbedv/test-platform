import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DIFFICULTY_OPTIONS, CATEGORY_OPTIONS } from "@/shared/constants/labels"
import { SORT_OPTIONS, OPTION_ALL } from "../constants"
import type { CatalogFilterParams } from "../types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface CatalogToolbarProps {
  resultCount: number
  filterParams: CatalogFilterParams,
  onSearchChange: (key: keyof CatalogFilterParams, value: string) => void,
  clearFilters: () => void
}

/**
 * CatalogToolbar component - Filter and search bar for test catalog.
 * Provides search input, category/difficulty filters, sort options, and ownership toggles.
 * Shows result count and updates parent component on filter changes.
 */
export function CatalogToolbar({
  filterParams: { search, category, difficulty, ownership, sortBy },
  resultCount,
  onSearchChange,
  clearFilters,
}: CatalogToolbarProps) {
  return (
    <div className="flex flex-col gap-4">
      <Tabs
        value={ownership ?? "public"} 
        onValueChange={(val) => onSearchChange("ownership", val)}
        className="w-full"
        >
        <TabsList className="flex w-full">
            <TabsTrigger value="public" className="flex-1">
            Public Catalog
            </TabsTrigger>
            <TabsTrigger value="mine" className="flex-1">
            My Tests
            </TabsTrigger>
            <TabsTrigger value="all_tests" className="flex-1">
            All Tests
            </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tests by title or description..."
            value={search}
            onChange={(e) => onSearchChange("search", e.target.value)}
            className="pl-9"
            aria-label="Search tests"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={category ?? OPTION_ALL} onValueChange={(v) => onSearchChange("category", v)}>
            <SelectTrigger className="w-40 bg-card" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OPTION_ALL}>All Categories</SelectItem>
              {CATEGORY_OPTIONS.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={difficulty ?? OPTION_ALL} onValueChange={(v) => onSearchChange("difficulty", v)}>
            <SelectTrigger className="w-35 bg-card" aria-label="Filter by difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={OPTION_ALL}>All Difficulties</SelectItem>
              {DIFFICULTY_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy ?? "newest"} onValueChange={(v) => onSearchChange("sortBy", v)}>
            <SelectTrigger className="w-37.5 bg-card" aria-label="Sort tests by">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {resultCount === 1
            ? "1 test found"
            : `${resultCount} tests found`}
        </p>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-8 px-2 lg:px-3 text-muted-foreground hover:text-foreground"
        >
          Clear Filters
          <X className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
