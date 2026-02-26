import { useUserProfile, useUpdateProfile } from "./use-user-profile"

export function useProfilePage() {
  const { data: user, isLoading, isError } = useUserProfile()
  const updateProfile = useUpdateProfile()

  function handleSaveProfile(name: string, email: string) {
    updateProfile.mutate({ fullName: name, email })
  }

  return {
    user: user ?? { fullName: "", email: "", registeredAt: "" },
    isLoading,
    isError,
    isSaving: updateProfile.isPending,
    saveError: updateProfile.error,
    handleSaveProfile,
  }
}
