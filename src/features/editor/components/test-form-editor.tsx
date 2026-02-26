import { useState, useCallback } from "react"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import type { TestStatus } from "@/types/test"
import { CreateTestHeader } from "./create-test-header"
import { TestSettingsPanel } from "./test-settings-panel"
import type { TestSettings } from "../types"
import { QuestionsPanel } from "./questions-panel"
import { TestPreviewDialog } from "./test-preview-dialog"
import { PublishDialog } from "@/components/common/publish-dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle2, Lock } from "lucide-react"
import type { Question } from "@/types/question"
import { useCreateTest, useUpdateTest, usePublishTest } from "../hooks/use-save-test"

const defaultSettings: TestSettings = {
  title: "",
  description: "",
  category: "",
  difficulty: "",
  timeLimit: "",
  maxAttempts: "",
  randomOrder: false,
  pointsSystem: false,
}

interface TestFormEditorProps {
  testId?: string
  isEditing?: boolean
  initialSettings?: TestSettings
  initialQuestions?: Question[]
  initialTestStatus?: TestStatus
  onCancel?: () => void
}

export function TestFormEditor({
  testId,
  isEditing = false,
  initialSettings,
  initialQuestions,
  initialTestStatus = "draft",
  onCancel,
}: TestFormEditorProps) {
  const navigate = useNavigate()
  const [testStatus, setTestStatus] = useState<TestStatus>(initialTestStatus)
  const [settings, setSettings] = useState<TestSettings>(
    initialSettings ?? defaultSettings
  )
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions ?? []
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPreview, setShowPreview] = useState(false)
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)
  const [alert, setAlert] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const createTest = useCreateTest()
  const updateTest = useUpdateTest()
  const publishTestMutation = usePublishTest()

  const isSaving = createTest.isPending || updateTest.isPending || publishTestMutation.isPending
  const isPublished = testStatus === "published"

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!settings.title.trim()) {
      newErrors.title = "Test title is required."
    }
    if (!settings.category.trim()) {
      newErrors.category = "Category is required."
    }
    if (!settings.difficulty) {
      newErrors.difficulty = "Please select a difficulty level."
    }
    if (questions.length === 0) {
      newErrors.noQuestions = "Add at least one question."
    }

    questions.forEach((q) => {
      const key = `question-${q.id}`
      if (!q.text.trim()) {
        newErrors[`${key}-text`] = "Question text is required."
      }
      if (
        (q.type === "multiple-choice" || q.type === "true-false") &&
        !q.options.some((o) => o.isCorrect)
      ) {
        newErrors[`${key}-correct`] =
          "Please mark the correct answer."
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [settings, questions])

  async function handleSave() {
    setAlert(null)

    if (!validate()) {
      setAlert({
        type: "error",
        message:
          "Please fix the errors highlighted below before saving.",
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const payload = { settings, questions }

    if (isEditing && testId) {
      updateTest.mutate(
        { id: testId, payload },
        {
          onSuccess() {
            setAlert({
              type: "success",
              message: "Test updated successfully! Redirecting...",
            })
            setTimeout(() => {
              navigate({ to: PathConstants.MY_TESTS })
            }, 1500)
          },
          onError(err) {
            setAlert({ type: "error", message: err.message })
          },
        },
      )
    } else {
      createTest.mutate(payload, {
        onSuccess() {
          setAlert({
            type: "success",
            message: "Test saved successfully! Redirecting...",
          })
          setTimeout(() => {
            navigate({ to: PathConstants.MY_TESTS })
          }, 1500)
        },
        onError(err) {
          setAlert({ type: "error", message: err.message })
        },
      })
    }
  }

  function handlePublish() {
    setAlert(null)

    if (!validate()) {
      setAlert({
        type: "error",
        message:
          "Please fix the errors highlighted below before publishing.",
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    setPublishDialogOpen(true)
  }

  async function handlePublishConfirm() {
    setPublishDialogOpen(false)

    if (!testId) {
      // Create first then publish would need two steps; for now save as published
      createTest.mutate(
        { settings, questions },
        {
          onSuccess(data) {
            publishTestMutation.mutate(data.id, {
              onSuccess() {
                setTestStatus("published")
                setAlert({
                  type: "success",
                  message: "Test published successfully! Redirecting...",
                })
                setTimeout(() => {
                  navigate({ to: PathConstants.MY_TESTS })
                }, 1500)
              },
              onError(err) {
                setAlert({ type: "error", message: err.message })
              },
            })
          },
          onError(err) {
            setAlert({ type: "error", message: err.message })
          },
        },
      )
    } else {
      publishTestMutation.mutate(testId, {
        onSuccess() {
          setTestStatus("published")
          setAlert({
            type: "success",
            message: "Test published successfully! Redirecting...",
          })
          setTimeout(() => {
            navigate({ to: PathConstants.MY_TESTS })
          }, 1500)
        },
        onError(err) {
          setAlert({ type: "error", message: err.message })
        },
      })
    }
  }

  function handleCancel() {
    if (onCancel) {
      onCancel()
    } else {
      navigate({ to: PathConstants.MY_TESTS })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <CreateTestHeader
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={() => setShowPreview(true)}
        onCancel={handleCancel}
        isSaving={isSaving}
        questionCount={questions.length}
        isEditing={isEditing}
        testStatus={testStatus}
      />

      {isPublished && (
        <Alert className="border-warning/30 bg-warning/5">
          <Lock className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning">Published Test</AlertTitle>
          <AlertDescription className="text-warning">
            This test is published and cannot be edited. To make changes, create a new draft.
          </AlertDescription>
        </Alert>
      )}

      {alert && (
        <Alert
          variant={alert.type === "error" ? "destructive" : "default"}
          className={
            alert.type === "success"
              ? "border-success/50 bg-success/5 text-success [&>svg]:text-success"
              : ""
          }
        >
          {alert.type === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertTitle>
            {alert.type === "error" ? "Validation Error" : "Success"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {errors.noQuestions && !alert && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Missing Questions</AlertTitle>
          <AlertDescription>{errors.noQuestions}</AlertDescription>
        </Alert>
      )}

      <Separator />

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-6">
            <TestSettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
              errors={errors}
              disabled={isPublished}
            />
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <QuestionsPanel
            questions={questions}
            showPoints={settings.pointsSystem}
            errors={errors}
            onQuestionsChange={setQuestions}
            disabled={isPublished}
          />
        </main>
      </div>

      <TestPreviewDialog
        open={showPreview}
        onOpenChange={setShowPreview}
        settings={settings}
        questions={questions}
      />

      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        onConfirm={handlePublishConfirm}
        testTitle={settings.title}
      />
    </div>
  )
}
