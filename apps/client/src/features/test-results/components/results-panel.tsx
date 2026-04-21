import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ListChecks } from "lucide-react"
import type { AnswerOutcome } from "@test-platform/shared/constants";
import type { QuestionResult } from "@test-platform/shared/schemas"
import { QuestionBreakdown } from "./question-breakdown"
import { useQuestionsFilter } from "../hooks/use-questions-filter"
import { FILTER_OPTIONS } from "../constants"

interface ResultsPanelProps {
  questions: QuestionResult[]
}

/**
 * ResultsPanel component - Displays a detailed breakdown of test results by question.
 * Uses the QuestionBreakdown component to show details for each question, and a ToggleGroup for filtering.
 */
export function ResultsPanel({ questions }: ResultsPanelProps) {
  const { filter, setFilter, filtered, counts } = useQuestionsFilter(questions)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ListChecks className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Question Breakdown</CardTitle>
          </div>

          <ToggleGroup 
            type="single" 
            value={filter ?? ""} 
            onValueChange={(value) => setFilter(value ? (value as AnswerOutcome) : undefined)}
            className="flex items-center gap-1.5 justify-start"
            >
            {FILTER_OPTIONS.map((option) => (
              <ToggleGroupItem key={option.value} value={option.value} aria-label={`Filter by ${option.label}`} className="group h-8 gap-1.5 px-3">
                {option.label}
                <span className="rounded-full bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground group-data-[state=on]:bg-primary/20 group-data-[state=on]:text-primary">
                  {counts[option.value]}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-0 px-0 pb-0">
        <Accordion key={filter ?? ""} type="multiple" className="w-full">
          {filtered.map((q) => (
            <QuestionBreakdown
              key={q.questionNumber}
              question={q}
              value={`q-${q.questionNumber}`}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}