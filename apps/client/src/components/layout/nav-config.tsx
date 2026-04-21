/**
 * Main navigation configuration for the application sidebar.
 * Defines navigation items and helper functions for determining active states.
 */
import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  User,
} from "lucide-react"
import PathConstants from "@/routes/path-constants"

/** List of main navigation items displayed in the sidebar */
export const MAIN_NAV_ITEMS: Array<{
  label: string
  href: string
  icon: LucideIcon
}> = [
  { label: "Dashboard", href: PathConstants.INDEX, icon: LayoutDashboard },
  { label: "Catalog", href: PathConstants.CATALOG, icon: FileText },
  { label: "Create Test", href: PathConstants.CREATE_TEST, icon: PlusCircle },
  { label: "Statistics", href: PathConstants.STATISTICS, icon: BarChart3 },
  { label: "Profile", href: PathConstants.PROFILE, icon: User },
]

/**
 * Determines if a navigation item should be marked as active.
 * Treats INDEX and DASHBOARD as the same route for styling purposes.
 */
export function isNavItemActive(href: string, pathname: string): boolean {
  if (pathname === href) return true
  if (href === PathConstants.INDEX && pathname === PathConstants.DASHBOARD)
    return true
  return false
}
