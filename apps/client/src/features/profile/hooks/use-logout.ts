import { useQueryClient, useMutation } from "@tanstack/react-query"
import { postLogout } from "../api/profile-api"

/**
 * Custom hook for user logout.
 * Clears all cached queries after successful logout.
 * @returns Mutation object for logout
 */
export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.clear()
    }
  })
}
