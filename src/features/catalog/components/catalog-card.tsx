import { useNavigate } from "@tanstack/react-router"
import PathConstants from "@/app/routes/path-constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, HelpCircle, Trophy, User, Users } from "lucide-react"
import { IconStat } from "@/components/common"
import type { CatalogTest } from "../types"
import { DifficultyBadge } from "./difficulty-badge"

interface CatalogCardProps {
  test: CatalogTest
}

export function CatalogCard({ test }: CatalogCardProps) {
  const navigate = useNavigate()
  const isOwner = test.ownership === "mine"
  const isDraft = test.status === "draft"

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <CardTitle className="text-base font-semibold leading-snug text-foreground">
              {test.title}
            </CardTitle>
            {!isOwner && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {test.author}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {isDraft && (
              <Badge variant="outline" className="text-muted-foreground">
                Draft
              </Badge>
            )}
            <DifficultyBadge difficulty={test.difficulty} />
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-x-4 gap-y-1.5 pb-4">
        <IconStat
          icon={<HelpCircle className="h-3.5 w-3.5" />}
          value={`${test.questions} questions`}
        />
        {test.timeLimit && (
          <IconStat
            icon={<Clock className="h-3.5 w-3.5" />}
            value={`${test.timeLimit} min`}
          />
        )}
        {!isDraft && (
          <IconStat
            icon={<Users className="h-3.5 w-3.5" />}
            value={`${test.attempts} attempts`}
          />
        )}
        {test.bestScore !== null && (
          <IconStat
            icon={<Trophy className="h-3.5 w-3.5" />}
            value={`Best: ${test.bestScore}%`}
            className="text-success"
          />
        )}
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0">
        {isDraft ? (
          <Button
            onClick={() => navigate({ to: PathConstants.EDIT_TEST, params: { id: test.id } })}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={() => navigate({ to: PathConstants.TEST_ATTEMPT, params: { id: test.id } })}
            size="sm"
            className="w-full"
          >
            Take Test
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
