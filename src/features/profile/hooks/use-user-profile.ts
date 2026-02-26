import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query-keys"
import {
  getProfile,
  updateProfile,
  changePassword,
} from "../api/profile-api"

export function useUserProfile() {
  return useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: getProfile,
  })
}

export function useUpdateProfile() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: { fullName: string; email: string }) =>
      updateProfile(data),
    onSuccess() {
      qc.invalidateQueries({ queryKey: queryKeys.profile.me() })
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string
      newPassword: string
    }) => changePassword(currentPassword, newPassword),
  })
}
