import { useParams, useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { useTestForEdit } from "./use-test-detail"

export function useEditTestPage() {
  const { id } = useParams({ strict: false })
  const navigate = useNavigate()

  const { data, isLoading, isError } = useTestForEdit(id)

  const testData = data ? { settings: data.settings, questions: data.questions } : null
  const testStatus = data?.status ?? "draft"

  const isNotFound = !isLoading && id && !testData && !isError
  const isEditing = !!id && !!testData

  function handleCancel() {
    navigate({ to: PathConstants.MY_TESTS })
  }

  function handleNotFoundNavigation() {
    navigate({ to: PathConstants.MY_TESTS })
  }

  return {
    id,
    testData: testData || null,
    testStatus,
    isLoading,
    isError,
    isNotFound: !!isNotFound,
    isEditing,
    handleCancel,
    handleNotFoundNavigation,
  } as const
}
