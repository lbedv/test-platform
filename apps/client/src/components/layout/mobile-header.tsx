import { useState } from "react"
import { Link, useLocation } from "@tanstack/react-router"
import { Menu } from "lucide-react"
import { TestPlatformLogo } from "../common"
import { Button } from "@/components/ui/button"
import { Separator } from "../ui/separator"
import { ThemeToggle } from "./theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavItem } from "./nav-item"
import { MAIN_NAV_ITEMS, isNavItemActive } from "./nav-config"
import { SheetDescription } from "@/components/ui/sheet"

/**
 * MobileHeader component - A responsive header for mobile devices.
 * Contains the logo and a hamburger menu that opens a side sheet with navigation links.
 * The side sheet includes main navigation items, theme toggle, and logout option.
 */
export function MobileHeader() {
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
          <SheetDescription className="sr-only">
            Access navigation links, settings, and account options
          </SheetDescription>
          <div className="flex h-16 items-center px-6">
            <TestPlatformLogo size="sm" />
          </div>
          <Separator />
          <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile navigation">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item.href, pathname)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="block"
                >
                  <NavItem
                    icon={<item.icon className="h-4 w-4 shrink-0" />}
                    label={item.label}
                    isActive={isActive}
                  />
                </Link>
              )
            })}
          </nav>
          <div className="p-4">
            <Separator className="mb-4" />
            <div className="flex items-center gap-2 mb-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground font-medium">Theme</span>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
