import { BASE_TESTS, TEST_DATES, TEST_ATTEMPTS } from "@/data/mock-tests"
import type { UserTest } from "./types"

export const USER_TESTS_MOCK: UserTest[] = BASE_TESTS.map((test) => ({
  id: test.id,
  title: test.title,
  description: test.description,
  status: test.status,
  questions: test.questions,
  attempts: TEST_ATTEMPTS[test.id] ?? 0,
  createdAt: TEST_DATES[test.id] ?? "Unknown",
}))