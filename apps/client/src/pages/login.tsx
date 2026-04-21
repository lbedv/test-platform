import { LoginCard, AuthBackground } from "@/features/auth"

// LoginPage component - The main login view for users to authenticate.
export function LoginPage() {
  return (
    <AuthBackground>
      <LoginCard />
    </AuthBackground>
  )
}
