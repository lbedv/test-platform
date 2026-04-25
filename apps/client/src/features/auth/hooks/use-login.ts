import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { postLogin } from "../api/auth-api"
import { useAuthStore } from "@/shared/store/auth-store"
import type { LoginInput } from "@test-platform/shared/schemas"

/**
 * Custom hook for handling user login.
 * Uses React Query mutation to perform login API call.
 * On success, updates auth store and navigates to dashboard.
 * @returns Mutation object with login functionality
 */
export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginInput) => postLogin(data),
    
    onSuccess: (data) => {
      useAuthStore.getState().login(data)
      navigate({ to: PathConstants.DASHBOARD })
    }
  })
}