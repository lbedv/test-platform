import { TestFormEditor, useEditTestPage } from "@/features/editor"
import { EmptyState } from "@/components/common"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EditTestPage() {
  const {
    testData,
    testStatus,
    isNotFound,
    isEditing,
    handleCancel,
    handleNotFoundNavigation,
  } = useEditTestPage()

  if (isNotFound || !testData) {
    return (
      <EmptyState
        icon={<FileText />}
        title="Test not found"
        description="The test you are trying to edit does not exist."
        action={
          <Button
            variant="outline"
            onClick={handleNotFoundNavigation}
          >
            Back to My Tests
          </Button>
        }
      />
    )
  }

  return (
    <TestFormEditor
      isEditing={isEditing}
      initialSettings={testData.settings}
      initialQuestions={testData.questions}
      initialTestStatus={testStatus}
      onCancel={handleCancel}
    />
  )
}
