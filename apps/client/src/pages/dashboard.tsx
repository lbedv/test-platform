import { WelcomeHeader, StatsPanel, AttemptsList } from "@/features/dashboard"
import { Separator } from "@/components/ui/separator"
import { useDashboardStats, useCompletedAttempts } from "@/features/dashboard/"
import { useAuthStore } from "@/shared/store/auth-store"
import { Skeleton } from "@/components/ui/skeleton"

// DashboardPage component - The main dashboard view for logged-in users.
// Displays a welcome header, key statistics, and recent test attempts.
export function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  const { data: stats, isLoading: isLoadingStats, isError: isErrorStats } = useDashboardStats()
  const { data: attempts, isLoading: isLoadingAttempts, isError: isErrorAttempts } = useCompletedAttempts()

  return (
    <div className="flex flex-col gap-8">
      <WelcomeHeader {...user} />

      {isLoadingStats ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-30 rounded-xl" />
        ))}
      </div>
      ) : isErrorStats || !stats ? (
        <p className="text-sm text-destructive">Failed to load dashboard stats.</p>
      ) : (
        <StatsPanel stats={stats} />
      )}
      <Separator />

      {isLoadingAttempts ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-35 rounded-xl" />
          ))}
        </div>
      ) : isErrorAttempts || !attempts ? (
        <p className="text-sm text-destructive">Failed to load recent attempts.</p>
      ) : (
        <AttemptsList attempts={attempts} />
      )}
    </div>
  )
}