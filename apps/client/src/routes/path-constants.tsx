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
  CREATE_TEST: "/my-tests/create",
  STATISTICS: "/statistics",
  PROFILE: "/profile",
  TEST_ATTEMPT: "/attempt",
  TEST_RESULTS: "/results/$id",
} as const

export type PathConstant = (typeof PathConstants)[keyof typeof PathConstants]
export default PathConstants
