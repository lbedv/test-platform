/**
 * Application routing configuration using TanStack Router.
 * Defines all routes, route hierarchy, and lazy-loaded components with suspense boundaries.
 * Routes are organized into two main branches: authenticated (app) and unauthenticated (auth).
 */
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router"
import { useAuthStore } from "@/shared/store/auth-store"
import { Suspense } from "react"
import PathConstants from "./path-constants"
import {
  LoginPage,
  RegisterPage,
  Layout,
  AuthLayout,
  DashboardPage,
  CatalogPage,
  StatisticsPage,
  ProfilePage,
  CreateTestPage,
  TestAttemptPage,
  TestResultsPage,
  NotFoundPage,
} from "./pages"
import { Outlet } from "@tanstack/react-router"
import { CatalogFilterRequestSchema } from "@test-platform/shared/schemas"

/**
 * Loading fallback component shown while routes are being loaded.
 * Provides better UX with spinner during code splitting.
 */
const LoadingFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
)

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const appRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  beforeLoad: () => {
    const isLoggedIn = useAuthStore.getState().isLoggedIn
    
    if (!isLoggedIn) {
      throw redirect({
        to: PathConstants.LOGIN,
      })
    }
  },
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <Layout />
    </Suspense>
  ),
})

const authRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <AuthLayout />
    </Suspense>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.INDEX,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardPage />
    </Suspense>
  ),
})

const dashboardRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.DASHBOARD,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <DashboardPage />
    </Suspense>
  ),
})

const loginRoute = createRoute({
  getParentRoute: () => authRootRoute,
  path: PathConstants.LOGIN,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <LoginPage />
    </Suspense>
  ),
})

const registerRoute = createRoute({
  getParentRoute: () => authRootRoute,
  path: PathConstants.REGISTER,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <RegisterPage />
    </Suspense>
  ),
})

const catalogRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.CATALOG,
  validateSearch: (search) => CatalogFilterRequestSchema.parse(search),
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <CatalogPage />
    </Suspense>
  ),
})

const createTestRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.CREATE_TEST,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <CreateTestPage />
    </Suspense>
  ),
})

const statisticsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.STATISTICS,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <StatisticsPage />
    </Suspense>
  ),
})

const profileRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.PROFILE,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <ProfilePage />
    </Suspense>
  ),
})

const testAttemptRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.TEST_ATTEMPT,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <TestAttemptPage />
    </Suspense>
  ),
})

const testResultsRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.TEST_RESULTS,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <TestResultsPage />
    </Suspense>
  ),
})

const routeTree = rootRoute.addChildren([
  authRootRoute.addChildren([loginRoute, registerRoute]),
  appRootRoute.addChildren([
    indexRoute,
    dashboardRoute,
    catalogRoute,
    createTestRoute,
    statisticsRoute,
    profileRoute,
    testAttemptRoute,
    testResultsRoute,
  ]),
])

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <Suspense fallback={<LoadingFallback />}>
      <NotFoundPage />
    </Suspense>
  ),
  notFoundMode: 'root',
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}