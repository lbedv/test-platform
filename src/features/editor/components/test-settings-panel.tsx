import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings2 } from "lucide-react"
import type { TestSettings } from "../types"

interface TestSettingsPanelProps {
  settings: TestSettings
  onSettingsChange: (settings: TestSettings) => void
  errors: Record<string, string>
  disabled?: boolean
}

export function TestSettingsPanel({
  settings,
  onSettingsChange,
  errors,
  disabled = false,
}: TestSettingsPanelProps) {
  function updateField<K extends keyof TestSettings>(
    field: K,
    value: TestSettings[K]
  ) {
    onSettingsChange({ ...settings, [field]: value })
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Settings2 className="h-4 w-4 text-primary" />
          Test Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="test-title" className="text-sm font-medium text-foreground">
            Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="test-title"
            placeholder="Enter test title..."
            value={settings.title}
            onChange={(e) => updateField("title", e.target.value)}
            disabled={disabled}
            className={errors.title ? "border-destructive focus:ring-destructive" : ""}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-xs text-destructive">
              {errors.title}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="test-description" className="text-sm font-medium text-foreground">
            Description
          </Label>
          <Textarea
            id="test-description"
            placeholder="Describe your test..."
            rows={3}
            value={settings.description}
            onChange={(e) => updateField("description", e.target.value)}
            disabled={disabled}
            className="resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="test-category" className="text-sm font-medium text-foreground">
            Category <span className="text-destructive">*</span>
          </Label>
          <Input
            id="test-category"
            placeholder="e.g. Mathematics, Science..."
            value={settings.category}
            onChange={(e) => updateField("category", e.target.value)}
            disabled={disabled}
            className={errors.category ? "border-destructive focus:ring-destructive" : ""}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
          />
          {errors.category && (
            <p id="category-error" className="text-xs text-destructive">
              {errors.category}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium text-foreground">
            Difficulty <span className="text-destructive">*</span>
          </Label>
          <Select
            value={settings.difficulty}
            onValueChange={(value) => updateField("difficulty", value)}
            disabled={disabled}
          >
            <SelectTrigger
              className={errors.difficulty ? "border-destructive focus:ring-destructive" : ""}
              aria-label="Select difficulty"
            >
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          {errors.difficulty && (
            <p className="text-xs text-destructive">{errors.difficulty}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="time-limit" className="text-sm font-medium text-foreground">
            Time Limit (minutes)
          </Label>
          <Input
            id="time-limit"
            type="number"
            min="1"
            placeholder="e.g. 60"
            value={settings.timeLimit}
            onChange={(e) => updateField("timeLimit", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="max-attempts" className="text-sm font-medium text-foreground">
            Max Attempts
          </Label>
          <Input
            id="max-attempts"
            type="number"
            min="1"
            placeholder="e.g. 3"
            value={settings.maxAttempts}
            onChange={(e) => updateField("maxAttempts", e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="random-order"
            checked={settings.randomOrder}
            onCheckedChange={(checked) =>
              updateField("randomOrder", checked === true)
            }
            disabled={disabled}
          />
          <Label
            htmlFor="random-order"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Randomize question order
          </Label>
        </div>

        <div className="flex items-center gap-3">
          <Checkbox
            id="points-system"
            checked={settings.pointsSystem}
            onCheckedChange={(checked) =>
              updateField("pointsSystem", checked === true)
            }
            disabled={disabled}
          />
          <Label
            htmlFor="points-system"
            className="text-sm font-medium text-foreground cursor-pointer"
          >
            Enable points system
          </Label>
        </div>
      </CardContent>
    </Card>
  )
}
