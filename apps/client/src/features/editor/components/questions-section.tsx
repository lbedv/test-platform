import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import { Plus } from "lucide-react"
import { QuestionAccordionItem } from "./question-accordion-item"
import { useTestEditorStore } from "@/shared/store/test-editor-store"

export function QuestionsSection() {
  const {
    test,
    addQuestion,
  } = useTestEditorStore()
  
  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-foreground">Questions</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add and manage your quiz questions
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">

        {test.questions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p className="mb-4">No questions added yet</p>
            <Button onClick={addQuestion} variant="outline" className="border-border">
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Question
            </Button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {test.questions.map((question) => (
              <QuestionAccordionItem
                key={question.id}
                questionId={question.id}
              />
            ))}
          </Accordion>
        )}

        {test.questions.length > 0 && (
          <Button
            onClick={addQuestion}
            className="mt-6 w-full"
            variant="outline"
            size="lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Question
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
