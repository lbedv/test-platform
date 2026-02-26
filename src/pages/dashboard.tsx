import { WelcomeHeader, StatCards, MyAttempts } from "@/features/dashboard"
import { Separator } from "@/components/ui/separator"

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader />
      <StatCards />
      <Separator />
      <MyAttempts />
    </div>
  )
}
