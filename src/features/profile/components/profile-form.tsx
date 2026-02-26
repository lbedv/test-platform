import { useState } from "react"
import { Save } from "lucide-react"
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
import { useUpdateProfile } from "../hooks/use-user-profile"

interface ProfileFormProps {
  initialName: string
  initialEmail: string
  onSave: (name: string, email: string) => void
}

export function ProfileForm({
  initialName,
  initialEmail,
  onSave,
}: ProfileFormProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [saved, setSaved] = useState(false)
  const updateProfile = useUpdateProfile()

  const hasChanges = name !== initialName || email !== initialEmail

  function validate() {
    const newErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      newErrors.name = "Display name is required."
    } else if (name.trim().length < 2) {
      newErrors.name = "Display name must be at least 2 characters."
    }

    if (!email.trim()) {
      newErrors.email = "Email is required."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    updateProfile.mutate(
      { fullName: name.trim(), email: email.trim() },
      {
        onSuccess() {
          onSave(name.trim(), email.trim())
          setSaved(true)
          setTimeout(() => setSaved(false), 3000)
        },
      },
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile Information</CardTitle>
        <CardDescription>
          Update your display name and email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {saved && <SuccessAlert message="Profile updated successfully." />}

          {updateProfile.error && (
            <p className="text-sm text-destructive">
              {updateProfile.error.message}
            </p>
          )}

          <FormInput
            id="profile-name"
            label="Display Name"
            value={name}
            onChange={(value) => {
              setName(value)
              if (errors.name) setErrors((p) => ({ ...p, name: undefined }))
            }}
            placeholder="Your full name"
            error={errors.name}
          />

          <FormInput
            id="profile-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value)
              if (errors.email)
                setErrors((p) => ({ ...p, email: undefined }))
            }}
            placeholder="you@example.com"
            error={errors.email}
          />

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={!hasChanges || updateProfile.isPending}
            >
              <Save className="h-4 w-4" />
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
