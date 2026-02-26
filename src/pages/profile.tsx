import { ProfileHeader, ProfileForm, PasswordForm, useProfilePage } from "@/features/profile"
import { PageHeader } from "@/components/common"
import { Separator } from "@/components/ui/separator"

export function ProfilePage() {
  const { user, handleSaveProfile } = useProfilePage()

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Profile"
        description="Manage your account information and security settings."
      />
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
    </div>
  )
}
