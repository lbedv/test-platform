import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Mail } from "lucide-react"
import { formatDate } from "@/shared/lib/date"

interface ProfileHeaderProps {
  firstName: string
  lastName: string
  email: string
  registeredAt: string
}

/**
 * ProfileHeader component - Displays user profile information with avatar.
 * Shows user's initials in avatar, full name, email, and registration date.
 */
export function ProfileHeader({
  firstName,
  lastName,
  email,
  registeredAt,
}: ProfileHeaderProps) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Avatar className="h-24 w-24 text-2xl">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground text-balance">
          {firstName} {lastName}
        </h1>
        <div className={`flex items-center justify-center gap-1.5 text-sm text-muted-foreground`}>
          <Mail className="h-3.5 w-3.5" />
          <span>{email}</span>
        </div>
        <div className={`flex items-center justify-center gap-1.5 text-xs text-muted-foreground`}>
          <CalendarDays className="h-3 w-3" />
          <span>{`Member since ${formatDate(registeredAt)}`}</span>
        </div>
      </div>
    </div>
  )
}
