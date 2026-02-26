import { Outlet } from "@tanstack/react-router"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function AuthLayout() {
  return (
    <div className="relative min-h-screen">
      <Outlet />
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  )
}
