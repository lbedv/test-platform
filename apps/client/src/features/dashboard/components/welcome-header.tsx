import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

type WelcomeHeaderProps = {
    firstName?: string
    lastName?: string
}

/**
 * WelcomeHeader component - Displays a welcome message with the user's initials.
 */
export function WelcomeHeader( { firstName, lastName }: WelcomeHeaderProps ) {
  if (!firstName || !lastName) {
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

  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();

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
