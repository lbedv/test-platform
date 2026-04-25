import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { postRegister } from "../api/auth-api"
import { useAuthStore } from "@/shared/store/auth-store"
import { RegisterInputSchema, type RegisterFormData} from "@test-platform/shared/schemas"

/**
 * Custom hook for handling user registration.
 * Validates form data and uses React Query mutation to perform registration API call.
 * On success, updates auth store and navigates to dashboard.
 * @returns Mutation object with registration functionality
 */
export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (formData: RegisterFormData) => {
      const registerDto = RegisterInputSchema.parse(formData)
      return postRegister(registerDto)
    },

    onSuccess(data) {
      useAuthStore.getState().login(data)
      navigate({ to: PathConstants.DASHBOARD })
    },
  })
}
