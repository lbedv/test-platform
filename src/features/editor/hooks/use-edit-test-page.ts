import { useParams, useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { BASE_TESTS } from "@/data/mock-tests"
import { getTestById } from "../editor-data"

export function useEditTestPage() {
  const { id } = useParams({ strict: false })
  const navigate = useNavigate()

  const testData = id ? getTestById(id) : null
  const testStatus = id ? BASE_TESTS.find((t) => t.id === id)?.status ?? "draft" : "draft"

  const isNotFound = id && !testData
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
    isNotFound: !!isNotFound,
    isEditing,
    handleCancel,
    handleNotFoundNavigation,
  } as const
}
