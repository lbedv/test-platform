import type { SelectOption } from "@/shared/constants/labels"
import type { Difficulty, SortOption } from "@test-platform/shared/constants"

export const ITEMS_PER_PAGE = 6

export const OPTION_ALL = "ALL"

export const SORT_OPTIONS: SelectOption<SortOption>[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "attempts", label: "Attempts" },
];

export const DIFFICULTY_STYLES = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
} satisfies Record<Difficulty, "success" | "warning" | "destructive">;