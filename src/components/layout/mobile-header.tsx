import { useState } from "react"
import { useNavigate, useLocation } from "@tanstack/react-router"
import { LogOut, Menu } from "lucide-react"
import { TestPlatformLogo } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavItem } from "./nav-item"
import PathConstants from "@/app/routes/path-constants"
import { MAIN_NAV_ITEMS, isNavItemActive } from "./nav-config"

export function MobileHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const [open, setOpen] = useState(false)

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:hidden">
      <TestPlatformLogo size="sm" />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-16 items-center px-6">
            <TestPlatformLogo size="sm" />
          </div>
          <Separator />
          <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile navigation">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)
              return (
                <NavItem
                  key={item.href}
                  icon={<item.icon className="h-4 w-4 shrink-0" />}
                  label={item.label}
                  isActive={isActive}
                  onClick={() => {
                    navigate({ to: item.href })
                    setOpen(false)
                  }}
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
              onClick={() => {
                navigate({ to: PathConstants.LOGIN })
                setOpen(false)
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
