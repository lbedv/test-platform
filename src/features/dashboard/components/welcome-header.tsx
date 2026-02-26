import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useCurrentUser } from "../hooks/use-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function getFirstName(name: string) {
  return name.split(" ")[0] || name
}

export function WelcomeHeader() {
  const { data: user, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    )
  }

  const fullName = user?.fullName ?? "User"
  const initials = getInitials(fullName)
  const firstName = getFirstName(fullName)

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 border-2 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Welcome back, {firstName}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here are your recent test attempts and activity.
        </p>
      </div>
    </div>
  )
}
