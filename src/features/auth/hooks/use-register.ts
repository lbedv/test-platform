import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { postRegister } from "../api/auth-api"

export function useRegister() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
    }: {
      fullName: string
      email: string
      password: string
    }) => postRegister(fullName, email, password),
    onSuccess(data) {
      localStorage.setItem("auth_token", data.token)
      navigate({ to: PathConstants.DASHBOARD })
    },
  })
}
