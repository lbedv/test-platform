import { Outlet } from "@tanstack/react-router"
import { ThemeToggle } from "@/components/layout/theme-toggle"

// This layout is used for authentication-related pages (login/register).
export function AuthLayout() {
  return (
    <div className="min-h-screen">
      <Outlet />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  )
}
