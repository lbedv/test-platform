import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, HelpCircle, User, Users, Trash2 } from "lucide-react"
import { IconStat } from "@/components/common"
import { DIFFICULTY_LABELS } from "@/shared/constants/labels"
import { DIFFICULTY_STYLES } from "../constants"
import { formatDuration } from "@/shared/lib/date"
import type { TestSummary } from "@test-platform/shared/schemas"
import { useAuthStore } from "@/shared/store/auth-store"

interface CatalogCardProps {
  test: TestSummary
  isStarting: boolean
  isDeleting: boolean
  onOpenTestInfo: (test: TestSummary) => void
  onOpenDeleteConfirm: (test: TestSummary) => void
}

/**
 * CatalogCard component - Displays a single test card in the catalog with metadata.
 * Shows test title, author name, description, difficulty, question and attempt counts.
 */
export function CatalogCard({
  test,
  isStarting,
  isDeleting,
  onOpenTestInfo,
  onOpenDeleteConfirm,
}: CatalogCardProps) {
  const isOwner = test.isMine
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "ADMIN";

  return (
    <Card className="flex flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            <CardTitle className="text-base font-semibold leading-snug text-foreground">
              {test.testTitle}
            </CardTitle>
            {!isOwner && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {test.author.firstName} {test.author.lastName}
              </span>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Badge variant={DIFFICULTY_STYLES[test.testDifficulty]}>
              {DIFFICULTY_LABELS[test.testDifficulty]}
            </Badge>
          </div>
        </div>
        <CardDescription className="line-clamp-2 break-all text-sm leading-relaxed">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-auto flex flex-col gap-3 pt-0 items-start">
        {/* stats row - left aligned */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <IconStat
            icon={<HelpCircle className="h-3.5 w-3.5" />}
            value={`${test.questionsCount} questions`}
          />
          <IconStat
            icon={<Users className="h-3.5 w-3.5" />}
            value={`${test.attemptsCount} attempts`}
          />
          <IconStat
            icon={<Clock className="h-3.5 w-3.5" />}
            value={formatDuration(test.timeLimitSeconds, true)}
          />
        </div>

        {/* Buttons row */}
        <div className="flex gap-2 w-full">
          {/* Take Test button */}
          <Button
            size="sm"
            onClick={() => onOpenTestInfo(test)}
            className="flex-1"
            disabled={isStarting || isDeleting}
          >
            {isStarting ? "Starting..." : "Take Test"}
          </Button>

          {/* Delete button for admins */}
          {isAdmin && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onOpenDeleteConfirm(test)}
              disabled={isDeleting || isStarting}
              className="px-3"
            >
              {isDeleting ? "Deleting..." : <Trash2 className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
