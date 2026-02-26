import { ProfileHeader, ProfileForm, PasswordForm, useProfilePage } from "@/features/profile"
import { PageHeader } from "@/components/common"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfilePage() {
  const { user, isLoading, isError, handleSaveProfile } = useProfilePage()

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Profile"
        description="Manage your account information and security settings."
      />

      {isLoading && (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
          <Skeleton className="h-[120px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[200px] w-full rounded-xl" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-destructive text-center">
          Failed to load profile.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
          <ProfileHeader
            fullName={user.fullName}
            email={user.email}
            registeredAt={user.registeredAt}
          />
          <Separator />
          <ProfileForm
            initialName={user.fullName}
            initialEmail={user.email}
            onSave={handleSaveProfile}
          />
          <PasswordForm />
        </div>
      )}
    </div>
  )
}
