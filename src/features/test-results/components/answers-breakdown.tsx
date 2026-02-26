import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ListChecks } from "lucide-react"
import type { QuestionResult } from "../types"
import { QuestionBreakdownItem } from "./question-breakdown-item"
import { FilterButton } from "./filter-button"

interface AnswersBreakdownProps {
  questions: QuestionResult[]
}

export function AnswersBreakdown({ questions }: AnswersBreakdownProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all")

  const filtered = questions.filter((q) => {
    if (filter === "correct") return q.isCorrect
    if (filter === "incorrect") return !q.isCorrect
    return true
  })

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Question Breakdown</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            <FilterButton
              label="All"
              active={filter === "all"}
              onClick={() => setFilter("all")}
              count={questions.length}
            />
            <FilterButton
              label="Correct"
              active={filter === "correct"}
              onClick={() => setFilter("correct")}
              count={questions.filter((q) => q.isCorrect).length}
            />
            <FilterButton
              label="Incorrect"
              active={filter === "incorrect"}
              onClick={() => setFilter("incorrect")}
              count={questions.filter((q) => !q.isCorrect).length}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 px-0 pb-0">
        {filtered.map((q, idx) => (
          <QuestionBreakdownItem
            key={q.questionNumber}
            question={q}
            isExpanded={expandedIndex === q.questionNumber}
            isFirst={idx === 0}
            onToggle={() =>
              setExpandedIndex(
                expandedIndex === q.questionNumber ? null : q.questionNumber
              )
            }
          />
        ))}

        {filtered.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-muted-foreground">
              No questions match the selected filter.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
