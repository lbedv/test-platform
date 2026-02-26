import { TestFormEditor, useEditTestPage } from "@/features/editor"
import { EmptyState } from "@/components/common"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function EditTestPage() {
  const {
    id,
    testData,
    testStatus,
    isLoading,
    isNotFound,
    isEditing,
    handleCancel,
    handleNotFoundNavigation,
  } = useEditTestPage()

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    )
  }

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
      testId={id}
      isEditing={isEditing}
      initialSettings={testData.settings}
      initialQuestions={testData.questions}
      initialTestStatus={testStatus}
      onCancel={handleCancel}
    />
  )
}
