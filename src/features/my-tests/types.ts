import type { TestStatus } from "@/types/test"

export interface UserTest {
  id: string
  title: string
  description: string
  status: TestStatus
  questions: number
  attempts: number
  createdAt: string
}