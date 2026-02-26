export type TestStatus = "published" | "draft"
export type Difficulty = "easy" | "medium" | "hard"

export interface TestMetadata {
  id: string
  status: TestStatus
  createdAt: string
  publishedAt?: string
}