import { useQueryClient, useMutation } from "@tanstack/react-query"
import { postLogout } from "../api/profile-api"

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
