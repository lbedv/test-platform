import { Badge } from "@/components/ui/badge"
import type { CreatedTest } from "../types"

interface TestMetadataProps {
  test: CreatedTest
}

export function TestMetadata({ test }: TestMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline" className="text-xs">
        {test.category}
      </Badge>
      <span className="text-xs text-muted-foreground">
        {test.totalQuestions} questions
      </span>
      <span className="text-xs text-muted-foreground">
        Passing: {test.passingScore}%
      </span>
    </div>
  )
}
