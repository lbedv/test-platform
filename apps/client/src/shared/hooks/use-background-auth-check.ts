import { useAuthStore } from "@/shared/store/auth-store"
import { ApiError, apiFetch } from "@/shared/lib/api-client"
import { AuthResponseSchema } from "@test-platform/shared/schemas"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook that performs background authentication checks.
 * - Verifies auth session on component mount
 * - Validates stored auth state against server
 * - Logs out user if session is invalid
 * - Can be used to refresh user data periodically
 */
export function useBackgroundAuthCheck() {
  const navigate = useNavigate()
  const { isLoggedIn, login, logout } = useAuthStore()

  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: async () => {

      try {
        const response = await apiFetch(
          "/users/me",
          {
            method: "GET",
            schema: AuthResponseSchema,
          }
        )
        login(response)
        return response
      } catch (error: unknown) {
        if (error instanceof ApiError && error.status === 401) {
          console.error("Auth check failed:", error)
          logout()
          navigate({
            to: PathConstants.LOGIN,
            replace: true,
          })
        }
        throw error
      }
    },

    enabled: isLoggedIn,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
