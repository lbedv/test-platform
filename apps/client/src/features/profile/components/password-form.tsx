import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/common"
import { PasswordFormSchema, type PasswordFormData } from "@test-platform/shared/schemas"
import { useChangePassword } from "../hooks/use-change-password"

/**
 * PasswordForm component - Form for changing user password.
 * Uses useChangePassword mutation for API calls and sonner for toast notifications.
 */
export function PasswordForm() {
  const { mutate: changePassword, isPending } = useChangePassword()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: PasswordFormData) => {
    changePassword(data, {
      onSuccess: () => {
        reset()
        toast.success("Password updated successfully.", {
          position: "top-right"
        })
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Failed to update password.", {
          position: "top-right"
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormInput
            id="current-password"
            label="Current Password"
            error={errors.currentPassword?.message}
            placeholder="Enter current password"
            showPasswordToggle
            {...register("currentPassword")}
          />

          <FormInput
            id="new-password"
            label="New Password"
            error={errors.newPassword?.message}
            placeholder="At least 8 characters"
            showPasswordToggle
            {...register("newPassword")}
          />

          <FormInput
            id="confirm-password"
            label="Confirm New Password"
            error={errors.confirmPassword?.message}
            placeholder="Repeat new password"
            showPasswordToggle
            {...register("confirmPassword")}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="secondary"
              disabled={!isDirty || isPending}
            >
              <Lock className="h-4 w-4 mr-2" />
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}