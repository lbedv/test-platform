import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { type Category, type Difficulty, TEST_CATEGORIES, TEST_DIFFICULTIES } from "@test-platform/shared/constants"
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from "@/shared/constants/labels"
import { useTestEditorStore, selectQuestionsCount, selectTotalPoints } from "@/shared/store/test-editor-store"
import { formatDuration } from "@/shared/lib/date"

function ErrorMessage({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null
  return (
    <p className="mt-1 text-sm text-destructive flex items-center gap-1">
      <AlertCircle className="h-3 w-3" />
      {errors[0]}
    </p>
  )
}

export function TestDetailsCard() {
  const { test, updateTestDetails, getFieldErrors } = useTestEditorStore()
  const totalPoints = useTestEditorStore(selectTotalPoints)
  const questionsCount = useTestEditorStore(selectQuestionsCount)

  const titleErrors = getFieldErrors('testTitle')
  const descriptionErrors = getFieldErrors('description')
  const timeLimitErrors = getFieldErrors('timeLimitSeconds')
  const passingPercentageErrors = getFieldErrors('passingPercentage')

  return (
    <Card className="mb-8 border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-foreground">Test Details</CardTitle>
        <CardDescription className="text-muted-foreground">Basic information about your test</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-foreground">Test Title</Label>
          <Input
            id="title"
            placeholder="Enter test title"
            value={test.testTitle}
            onChange={(e) => updateTestDetails({ testTitle: e.target.value })}
            className={'bg-background text-foreground' + (titleErrors.length > 0 ? " border-destructive" : " border-input")}
          />
          <ErrorMessage errors={titleErrors} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-foreground">Description</Label>
          <Textarea
            id="description"
            placeholder="Enter test description"
            value={test.description}
            onChange={(e) => updateTestDetails({ description: e.target.value })}
            rows={4}
            className="resize-none border-input bg-background text-foreground"
          />
          <ErrorMessage errors={descriptionErrors} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">Category</Label>
            <Select value={test.testCategory} onValueChange={(value: Category) => updateTestDetails({ testCategory: value })}>
              <SelectTrigger id="category" className="border-input bg-background text-foreground">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {TEST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-foreground">Difficulty</Label>
            <Select value={test.testDifficulty} onValueChange={(value: Difficulty) => updateTestDetails({ testDifficulty: value })}>
              <SelectTrigger id="difficulty" className="border-input bg-background text-foreground">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {TEST_DIFFICULTIES.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {DIFFICULTY_LABELS[diff]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="timeLimit" className="text-foreground">Time Limit (minutes)</Label>
            <Input
              id="timeLimit"
              type="number"
              min={1}
              value={test.timeLimitSeconds === 0 ? "" : Math.floor(test.timeLimitSeconds / 60)}
              onChange={(e) => updateTestDetails({ timeLimitSeconds: e.target.value ? Number(e.target.value) * 60 : 0 })}
              className={timeLimitErrors.length > 0 ? "border-destructive" : "border-input bg-background text-foreground"}
            />
            <ErrorMessage errors={timeLimitErrors} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passingPercentage" className="text-foreground">Passing Score (%)</Label>
            <Input
              id="passingPercentage"
              type="number"
              min={0}
              max={100}
              value={test.passingPercentage === 0 ? "" : test.passingPercentage}
              onChange={(e) => updateTestDetails({ passingPercentage: e.target.value ? Number(e.target.value) : 0 })}
              className={passingPercentageErrors.length > 0 ? "border-destructive" : "border-input bg-background text-foreground"}
            />
            <ErrorMessage errors={passingPercentageErrors} /> 
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-accent/30 p-4 text-sm">
          <div>
            <span className="text-muted-foreground">Questions:</span> <span className="font-semibold text-foreground">{questionsCount}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Points:</span> <span className="font-semibold text-secondary">{totalPoints}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Duration:</span> <span className="font-semibold text-primary">{formatDuration(test.timeLimitSeconds)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
