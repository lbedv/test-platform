import { useMutation } from "@tanstack/react-query"
import { changePassword } from "../api/profile-api"
import { PasswordChangeSchema, type PasswordFormData } from "@test-platform/shared/schemas"

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: PasswordFormData) => {
        const passwordChangeDto = PasswordChangeSchema.parse(data)
        return changePassword(passwordChangeDto);
    }
  })
}
