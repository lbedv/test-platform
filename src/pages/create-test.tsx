import { TestFormEditor } from "@/features/editor"

export function CreateTestPage() {
  return (
    <div className="flex flex-col gap-6">
      <TestFormEditor isEditing={false} />
    </div>
  )
}
