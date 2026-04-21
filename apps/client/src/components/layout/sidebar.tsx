/**
 * Main application sidebar navigation component.
 * Shows logo, main navigation items, theme toggle, and logout button.
 * Displayed on the left side of authenticated pages.
 */
import { Link } from "@tanstack/react-router"
import { TestPlatformLogo } from "../common"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "./theme-toggle"
import { NavItem } from "./nav-item"
import { MAIN_NAV_ITEMS } from "./nav-config"

export function Sidebar() {

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center px-6">
        <TestPlatformLogo size="sm" />
      </div>

      <Separator />

      {/* Main navigation links */}
      <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
        {MAIN_NAV_ITEMS.map((item) => (
          <Link 
            key={item.href} 
            to={item.href}
            activeProps={{ className: 'active' }} 
            className="block"
          >
            {({ isActive }) => (
              <NavItem
                icon={<item.icon className="h-4 w-4 shrink-0" />}
                label={item.label}
                isActive={isActive}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom section: Theme toggle */}
      <div className="p-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="text-sm text-muted-foreground font-medium">Theme</span>
        </div>
      </div>
    </aside>
  )
}