import { useState } from "react"
import { useTestEditorStore } from "@/shared/store/test-editor-store"
import {
  CreateTestHeader,
  TestDetailsCard,
  QuestionsSection
} from "@/features/editor"
import { usePublishTest } from "@/features/editor/hooks/use-publish-test"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { AlertCircle } from "lucide-react"

export function CreateTestPage() {
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)
  
  const { test, resetTest, validateTest, errors, clearErrors } = useTestEditorStore()
  const { mutate: publishTest, isPending } = usePublishTest()

  const handleClearAll = () => {
    setClearDialogOpen(true)
  }

  const confirmClearAll = () => {
    resetTest()
    clearErrors()
    setClearDialogOpen(false)
  }

  const handlePublish = () => {
    const isValid = validateTest()
    if (isValid) {
      setPublishDialogOpen(true)
    }
  }

  const confirmPublish = () => {
    publishTest(test)
    setPublishDialogOpen(false)
  }

  const questionErrors = errors.filter((e) => e.field.startsWith('questions'))

  return (
    <div className="min-h-screen bg-background">
      <CreateTestHeader onClearAll={handleClearAll} onPublish={handlePublish} />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {errors.length > 0 && (
          <Alert variant="destructive" className="mb-8 border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Validation Error</AlertTitle>
            {questionErrors.length > 0 && (
              <AlertDescription>
                {questionErrors[0].message}
              </AlertDescription>
            )}

          </Alert>
        )}

        <TestDetailsCard />
        <QuestionsSection />
      </div>

      {/* Clear All Confirmation Dialog */}
      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear All Content?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all test details and questions. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearAll} variant="destructive">
              Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Publish Test Confirmation Dialog */}
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Once published, you won't be able to make changes to this test. Make sure everything is correct.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPublish} disabled={isPending}>
              {isPending ? "Publishing..." : "Publish Test"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}