import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common"
import { Save, Eye, X, Send } from "lucide-react"
import type { TestStatus } from "@/types/test"

interface CreateTestHeaderProps {
  onSave: () => void
  onPublish: () => void
  onPreview: () => void
  onCancel: () => void
  isSaving: boolean
  questionCount: number
  isEditing?: boolean
  testStatus?: TestStatus
}

export function CreateTestHeader({
  onSave,
  onPublish,
  onPreview,
  onCancel,
  isSaving,
  questionCount,
  isEditing = false,
  testStatus = "draft",
}: CreateTestHeaderProps) {
  const isDraft = testStatus === "draft"
  const description =
    questionCount === 0
      ? isEditing
        ? "Update your test settings and questions below."
        : "Start by configuring your test settings and adding questions."
      : `${questionCount} question${questionCount !== 1 ? "s" : ""} added`

  return (
    <PageHeader
      title={isEditing ? "Edit Test" : "Create New Test"}
      description={description}
      className="gap-4"
    >
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1.5" />
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onPreview}
        >
          <Eye className="h-4 w-4 mr-1.5" />
          Preview
        </Button>
        {isDraft ? (
          <>
            <Button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              variant="outline"
              className="bg-transparent"
            >
              <Save className="h-4 w-4 mr-1.5" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              type="button"
              onClick={onPublish}
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-1.5" />
              {isSaving ? "Publishing..." : "Publish"}
            </Button>
          </>
        ) : (
          <Button
            type="button"
            onClick={onSave}
            disabled={true}
            className="bg-muted text-muted-foreground cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-1.5" />
            Published (Read-only)
          </Button>
        )}
      </div>
    </PageHeader>
  )
}
