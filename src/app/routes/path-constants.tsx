/**
 * Centralized route path constants.
 * Never hardcode URLs — always import from here.
 *
 * Usage:
 *   import PathConsts from '@/routes/PathConstants'
 *   <Link to={PathConsts.CATALOG} />
 *   navigate({ to: PathConsts.TEST_ATTEMPT, params: { id: attemptId } })
 */

const PathConstants = {
  INDEX: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  REGISTER: "/register",
  CATALOG: "/catalog",
  MY_TESTS: "/my-tests",
  CREATE_TEST: "/my-tests/create",
  EDIT_TEST: "/my-tests/edit/$id",
  STATISTICS: "/statistics",
  PROFILE: "/profile",
  TEST_ATTEMPT: "/attempt/$id",
  TEST_RESULTS: "/attempt/$id/results",
} as const

export type PathConstant = (typeof PathConstants)[keyof typeof PathConstants]
export default PathConstants
