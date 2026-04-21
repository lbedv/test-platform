import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/routes/path-constants"
import { postRegister } from "../api/auth-api"
import { useAuthStore } from "@/shared/store/auth-store"
import { RegisterInputSchema, type RegisterFormData} from "@test-platform/shared/schemas"

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
