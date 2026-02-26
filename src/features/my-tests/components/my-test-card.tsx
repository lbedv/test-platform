import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Users, HelpCircle, Pencil, BarChart3, Send } from "lucide-react"
import { IconStat } from "@/components/common"
import { StatusBadge } from "./status-badge";
import { PublishDialog } from "@/components/common/publish-dialog"
import type { UserTest } from "../types"

interface MyTestCardProps {
  test: UserTest
}

export function MyTestCard({ test }: MyTestCardProps) {
  const navigate = useNavigate()
  const [publishDialogOpen, setPublishDialogOpen] = useState(false)
  const isDraft = test.status === "draft"

  const handlePublish = () => {
    // Here you would typically make an API call to publish the test
    console.log(`Publishing test: ${test.id}`)
    setPublishDialogOpen(false)
    // After successful publish, you might need to refresh the tests list
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold leading-snug">
            {test.title}
          </CardTitle>
          <StatusBadge status={test.status} />
        </div>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 pb-3">
        <div className="flex gap-4">
          <IconStat
            icon={<HelpCircle className="h-3.5 w-3.5" />}
            value={`${test.questions} questions`}
          />
          {test.status === "published" && (
            <IconStat
              icon={<Users className="h-3.5 w-3.5" />}
              value={`${test.attempts} attempts`}
            />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Created {test.createdAt}
        </p>
      </CardContent>

      <CardFooter className="mt-auto gap-2 pt-0">
        {isDraft ? (
          <>
            <Button
              onClick={() => navigate({ to: PathConstants.EDIT_TEST, params: { id: test.id } })}
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
            <Button
              onClick={() => setPublishDialogOpen(true)}
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              Publish
            </Button>
          </>
        ) : (
          <Button
            onClick={() => navigate({ to: PathConstants.STATISTICS })}
            variant="outline"
            size="sm"
            className="w-full bg-transparent"
          >
            <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
            Stats
          </Button>
        )}
      </CardFooter>

      <PublishDialog
        open={publishDialogOpen}
        onOpenChange={setPublishDialogOpen}
        onConfirm={handlePublish}
        testTitle={test.title}
      />
    </Card>
  )
}
