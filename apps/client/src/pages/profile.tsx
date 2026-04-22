import { ProfileHeader, ProfileForm, PasswordForm } from "@/features/profile";
import PathConstants from "@/routes/path-constants";
import { useLogout } from "@/features/profile/";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/common/page-header";
import { useAuthStore } from "@/shared/store/auth-store";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// ProfilePage component - Displays user profile information and forms to update details and password.
export function ProfilePage() {
  const { mutate: handleLogout } = useLogout();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Profile"
        description="Manage your account information and security settings."
      />
      <Separator />

      {!user && (
        <p className="text-sm text-destructive text-center">
          Failed to load profile.
        </p>
      )}

      {user && (
        <div className="mx-auto flex w-full max-w-xl flex-col gap-8">
          <ProfileHeader
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            registeredAt={user.createdAt}
          />
          <ProfileForm
            initialFirstName={user.firstName}
            initialLastName={user.lastName}
            initialEmail={user.email}
          />
          <PasswordForm/>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          variant="destructive"
          onClick={() => {
            logout()
            handleLogout()
            navigate({ to: PathConstants.LOGIN })
          }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  )
}