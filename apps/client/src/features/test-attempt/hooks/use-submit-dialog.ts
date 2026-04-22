import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react"
import PathConstants from "@/routes/path-constants"
import { useNavigate } from "@tanstack/react-router"
import { submitAttempt } from "../api/test-attempt-api";
import { queryKeys } from "@/shared/lib/query-keys";


export function useSubmitDialog(attemptId: string) {
  const [showFinishDialog, setShowFinishDialog] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const submitMutation = useMutation({
    mutationFn: () => submitAttempt(attemptId),
    onSuccess: () => {
      setShowFinishDialog(false) 
      queryClient.removeQueries({ queryKey: queryKeys.attempt.active() })
      queryClient.invalidateQueries({queryKey: queryKeys.dashboard.attempts() })
      queryClient.invalidateQueries({queryKey: queryKeys.dashboard.stats() })
      navigate({ to: PathConstants.TEST_RESULTS, params: { id: attemptId } })
    }
  })

  const handleSubmit = useCallback(() => {
    setShowFinishDialog(true)
  }, [])

  const handleConfirmSubmit = () => {
    submitMutation.mutate() 
  }

  return {
    showFinishDialog,
    setShowFinishDialog,
    handleSubmit,
    handleConfirmSubmit,
    isLoading: submitMutation.isPending, 
    isError: submitMutation.error !== null,
  }
}