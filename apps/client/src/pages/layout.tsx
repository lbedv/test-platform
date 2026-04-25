import { useEffect, useRef } from "react"
import { Outlet, useLocation } from "@tanstack/react-router"
import { Sidebar, MobileHeader } from "@/components/layout"
import { useBackgroundAuthCheck } from "@/shared/hooks/use-background-auth-check"

// Main layout component that wraps around all pages except authentication.
export function Layout() {
  // Verify auth session in the background
  useBackgroundAuthCheck()

  const mainRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileHeader />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}