import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
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
import { ProfileUpdateSchema, type ProfileUpdate } from "@test-platform/shared/schemas"
import { useUpdateProfile } from "../hooks/use-update-profile"

interface ProfileFormProps {
  initialFirstName: string
  initialLastName: string
  initialEmail: string
}

/**
 * ProfileForm component - A form for updating user profile information.
 * Uses react-hook-form for form state management and zod for validation.
 * Integrates useUpdateProfile mutation for API calls.
 */
export function ProfileForm({
  initialFirstName,
  initialLastName,
}: ProfileFormProps) {
  const { mutate: updateProfile, isPending } = useUpdateProfile()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileUpdate>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
    },
  })

  const onSubmit = (data: ProfileUpdate) => {
    updateProfile(data, {
      onSuccess: () => {
        reset(data)
        toast.success("Profile updated successfully.", {
          position: "top-right"
        })
      },
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : "Failed to update profile.", {
          position: "top-right"
        })
      }
    })
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              id="profile-first-name"
              label="First Name"
              error={errors.firstName?.message}
              placeholder="Your first name"
              {...register("firstName")}
            />

            <FormInput
              id="profile-last-name"
              label="Last Name"
              error={errors.lastName?.message}
              placeholder="Your last name"
              {...register("lastName")}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={!isDirty || isPending}
            >
              <Save className="h-4 w-4 mr-2" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}