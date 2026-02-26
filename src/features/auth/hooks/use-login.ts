import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import { postLogin } from "../api/auth-api"

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin(email, password),
    onSuccess(data) {
      localStorage.setItem("auth_token", data.token)
      navigate({ to: PathConstants.DASHBOARD })
    },
  })
}
