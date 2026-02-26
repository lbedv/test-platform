import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function WelcomeHeader() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 border-2 border-primary/20">
        <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
          JD
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Welcome back, John
        </h1>
        <p className="text-sm text-muted-foreground">
          Here are your recent test attempts and activity.
        </p>
      </div>
    </div>
  )
}
