import { Button } from "@/components/ui/button"
import { Trash2, Upload } from "lucide-react"

interface TestEditorHeaderProps {
  onClearAll: () => void
  onPublish: () => void
}

export function CreateTestHeader({ onClearAll, onPublish }: TestEditorHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create Test</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onClearAll} className="border-border">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
          <Button onClick={onPublish} className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>
    </header>
  )
}
