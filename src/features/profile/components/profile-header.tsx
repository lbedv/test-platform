import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Mail } from "lucide-react"
import { UserInfoItem } from "./user-info-item"

interface ProfileHeaderProps {
  fullName: string
  email: string
  registeredAt: string
}

export function ProfileHeader({
  fullName,
  email,
  registeredAt,
}: ProfileHeaderProps) {
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Avatar className="h-24 w-24 text-2xl">
        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground text-balance">
          {fullName}
        </h1>
        <UserInfoItem icon={Mail} value={email} />
        <UserInfoItem
          icon={CalendarDays}
          value={`Member since ${registeredAt}`}
          iconSize="sm"
        />
      </div>
    </div>
  )
}
