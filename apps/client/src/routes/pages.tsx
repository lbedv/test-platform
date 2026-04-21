/**
 * Page components with lazy loading for code splitting
 * 
 * When adding a new page:
 * 1. Create the page in src/pages/
 * 2. Add lazy import here
 * 3. Add path to PathConstants.tsx
 * 4. Register the route in router.tsx
 */

import { lazy } from "react"

export const LoginPage = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.LoginPage }))
)
export const RegisterPage = lazy(() =>
  import("@/pages/register").then((m) => ({ default: m.RegisterPage }))
)
export const Layout = lazy(() =>
  import("@/pages/layout").then((m) => ({ default: m.Layout }))
)
export const AuthLayout = lazy(() =>
  import("@/pages/auth-layout").then((m) => ({ default: m.AuthLayout }))
)
export const DashboardPage = lazy(() =>
  import("@/pages/dashboard").then((m) => ({ default: m.DashboardPage }))
)
export const CatalogPage = lazy(() =>
  import("@/pages/catalog").then((m) => ({ default: m.CatalogPage }))
)
export const StatisticsPage = lazy(() =>
  import("@/pages/statistics").then((m) => ({ default: m.StatisticsPage }))
)
export const ProfilePage = lazy(() =>
  import("@/pages/profile").then((m) => ({ default: m.ProfilePage }))
)
export const CreateTestPage = lazy(() =>
  import("@/pages/create-test").then((m) => ({ default: m.CreateTestPage }))
)
export const TestAttemptPage = lazy(() =>
  import("@/pages/test-attempt").then((m) => ({ default: m.TestAttemptPage }))
)
export const TestResultsPage = lazy(() =>
  import("@/pages/test-results").then((m) => ({ default: m.TestResultsPage }))
)
export const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage }))
)
