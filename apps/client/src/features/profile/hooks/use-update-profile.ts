import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../api/profile-api"
import { type ProfileUpdate } from "@test-platform/shared/schemas"
import { useAuthStore } from "@/shared/store/auth-store"

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: ProfileUpdate) => updateProfile(data),
    
    onSuccess: (data) => {
      useAuthStore.getState().updateProfile(data)
    }
  })
}

