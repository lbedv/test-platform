import { RegisterCard, AuthBackground } from "@/features/auth"

// RegisterPage component - The main registration view for new users to create an account.
export function RegisterPage() {
  return (
    <AuthBackground>
      <RegisterCard />
    </AuthBackground>
  )
}
