import { MyTestCard } from "./my-test-card"
import type { UserTest } from "../types"

interface MyTestsListProps {
  tests: UserTest[]
}

export function MyTestsList({ tests }: MyTestsListProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {tests.map((test) => (
        <MyTestCard key={test.id} test={test} />
      ))}
    </div>
  )
}
