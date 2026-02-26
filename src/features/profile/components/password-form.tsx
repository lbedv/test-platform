import { useState } from "react"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FormInput } from "@/components/common"
import { SuccessAlert } from "./success-alert"
import { useChangePassword } from "../hooks/use-user-profile"

export function PasswordForm() {
  const [current, setCurrent] = useState("")
  const [newPw, setNewPw] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState<{
    current?: string
    newPw?: string
    confirm?: string
  }>({})
  const [saved, setSaved] = useState(false)
  const changePw = useChangePassword()

  const canSubmit =
    current.length > 0 && newPw.length > 0 && confirm.length > 0

  function validate() {
    const newErrors: {
      current?: string
      newPw?: string
      confirm?: string
    } = {}

    if (!current) {
      newErrors.current = "Current password is required."
    }

    if (!newPw) {
      newErrors.newPw = "New password is required."
    } else if (newPw.length < 8) {
      newErrors.newPw = "Password must be at least 8 characters."
    }

    if (!confirm) {
      newErrors.confirm = "Please confirm your new password."
    } else if (confirm !== newPw) {
      newErrors.confirm = "Passwords do not match."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    changePw.mutate(
      { currentPassword: current, newPassword: newPw },
      {
        onSuccess() {
          setCurrent("")
          setNewPw("")
          setConfirm("")
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
        },
      },
    )
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {saved && <SuccessAlert message="Password changed successfully." />}

          {changePw.error && (
            <p className="text-sm text-destructive">
              {changePw.error.message}
            </p>
          )}

          <FormInput
            id="current-password"
            label="Current Password"
            value={current}
            onChange={(value) => {
              setCurrent(value)
              if (errors.current)
                setErrors((p) => ({ ...p, current: undefined }))
            }}
            placeholder="Enter current password"
            error={errors.current}
            showPasswordToggle
          />

          <FormInput
            id="new-password"
            label="New Password"
            value={newPw}
            onChange={(value) => {
              setNewPw(value)
              if (errors.newPw)
                setErrors((p) => ({ ...p, newPw: undefined }))
            }}
            placeholder="At least 8 characters"
            error={errors.newPw}
            showPasswordToggle
          />

          <FormInput
            id="confirm-password"
            label="Confirm New Password"
            value={confirm}
            onChange={(value) => {
              setConfirm(value)
              if (errors.confirm)
                setErrors((p) => ({ ...p, confirm: undefined }))
            }}
            placeholder="Repeat new password"
            error={errors.confirm}
            showPasswordToggle
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              variant="secondary"
              disabled={!canSubmit || changePw.isPending}
            >
              <Lock className="h-4 w-4" />
              {changePw.isPending ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
