import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router"
import { Suspense } from "react"
import PathConstants from "@/app/routes/path-constants"
import {
  LoginPage,
  RegisterPage,
  Layout,
  AuthLayout,
  DashboardPage,
  CatalogPage,
  StatisticsPage,
  ProfilePage,
  MyTests,
  CreateTestPage,
  EditTestPage,
  TestAttemptPage,
  TestResultsPage,
  NotFoundPage,
} from "@/app/routes/Pages"
import { Outlet } from "@tanstack/react-router"

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
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <CatalogPage />
    </Suspense>
  ),
})

const myTestsPageRoute = createRoute({
  getParentRoute: () => appRootRoute,
  path: PathConstants.MY_TESTS,
})

const myTestsIndexRoute = createRoute({
  getParentRoute: () => myTestsPageRoute,
  path: PathConstants.INDEX,
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <MyTests />
    </Suspense>
  ),
})

const createTestRoute = createRoute({
  getParentRoute: () => myTestsPageRoute,
  path: "create",
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <CreateTestPage />
    </Suspense>
  ),
})

const editTestRoute = createRoute({
  getParentRoute: () => myTestsPageRoute,
  path: "edit/$id",
  component: () => (
    <Suspense fallback={<LoadingFallback />}>
      <EditTestPage />
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
    myTestsPageRoute.addChildren([myTestsIndexRoute, createTestRoute, editTestRoute]),
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
