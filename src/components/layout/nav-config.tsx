import type { LucideIcon } from "lucide-react"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  User,
} from "lucide-react"
import PathConstants from "@/app/routes/path-constants"

export const MAIN_NAV_ITEMS: Array<{
  label: string
  href: string
  icon: LucideIcon
}> = [
  { label: "Dashboard", href: PathConstants.INDEX, icon: LayoutDashboard },
  { label: "Catalog", href: PathConstants.CATALOG, icon: FileText },
  { label: "Create Test", href: PathConstants.MY_TESTS, icon: PlusCircle },
  { label: "Statistics", href: PathConstants.STATISTICS, icon: BarChart3 },
  { label: "Profile", href: PathConstants.PROFILE, icon: User },
]

export function isNavItemActive(href: string, pathname: string): boolean {
  if (pathname === href) return true
  if (href === PathConstants.INDEX && pathname === PathConstants.DASHBOARD)
    return true
  return false
}
