import { MyTestsPanel } from "@/features/my-tests"
import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"

export function MyTestsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <MyTestsPanel onCreateNew={() => navigate({ to: PathConstants.CREATE_TEST })} />
    </div>
  )
}
