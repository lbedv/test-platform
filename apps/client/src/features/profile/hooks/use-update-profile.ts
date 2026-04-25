import { useMutation } from "@tanstack/react-query"
import { updateProfile } from "../api/profile-api"
import { type ProfileUpdate } from "@test-platform/shared/schemas"
import { useAuthStore } from "@/shared/store/auth-store"

/**
 * Custom hook for updating user profile information.
 * Updates auth store with new profile data on success.
 * @returns Mutation object for profile updates
 */
export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: ProfileUpdate) => updateProfile(data),
    
    onSuccess: (data) => {
      useAuthStore.getState().updateProfile(data)
    }
  })
}

