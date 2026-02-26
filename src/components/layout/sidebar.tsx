import { useNavigate, useLocation } from "@tanstack/react-router"
import { LogOut } from "lucide-react"
import { TestPlatformLogo } from "@/components/common"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { NavItem } from "./nav-item"
import PathConstants from "@/app/routes/path-constants"
import { MAIN_NAV_ITEMS, isNavItemActive } from "./nav-config"

export function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-6">
        <TestPlatformLogo size="sm" />
      </div>

      <Separator />

      <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
        {MAIN_NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item.href, pathname)
          return (
            <NavItem
              key={item.href}
              icon={<item.icon className="h-4 w-4 shrink-0" />}
              label={item.label}
              isActive={isActive}
              onClick={() => navigate({ to: item.href })}
            />
          )
        })}
      </nav>

      <div className="p-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-2 mb-4">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground">Theme</span>
        </div>
        <NavItem
          icon={<LogOut className="h-4 w-4 shrink-0" />}
          label="Logout"
          isActive={false}
          isDanger
          onClick={() => navigate({ to: PathConstants.LOGIN })}
        />
      </div>
    </aside>
  )
}