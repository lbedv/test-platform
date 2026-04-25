import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface TestSelectorProps {
  tests: {
    id: string
    testTitle: string
  }[]
  selectedId: string
  onSelect: (id: string) => void
}

/**
 * TestSelector component - Dropdown for selecting a published test to view statistics for.
 * Shows test title and question count for each test in the dropdown.
 */
export function TestSelector({ tests, selectedId, onSelect }: TestSelectorProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      <Label
        htmlFor="test-selector"
        className="text-sm font-medium text-muted-foreground whitespace-nowrap"
      >
        Select a test
      </Label>
      <Select value={selectedId} onValueChange={onSelect}>
        <SelectTrigger id="test-selector" className="w-full sm:w-80">
          <SelectValue placeholder="Choose a test..." />
        </SelectTrigger>
        <SelectContent>
          {tests.map((test) => (
            <SelectItem key={test.id} value={test.id}>
              <span className="flex items-center gap-2">
                <span className="truncate">{test.testTitle}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
