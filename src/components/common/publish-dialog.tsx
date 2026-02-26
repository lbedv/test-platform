import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertCircle, Send } from "lucide-react"

interface PublishDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  testTitle: string
}

export function PublishDialog({
  open,
  onOpenChange,
  onConfirm,
  testTitle,
}: PublishDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Publish Test?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="flex flex-col gap-4">
              <p>
                Are you sure you want to publish <strong>{testTitle || "this test"}</strong>?
              </p>
              <div className="flex gap-3 rounded-lg border border-warning/30 bg-warning/5 p-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-warning mt-0.5" />
                <div className="flex flex-col gap-1 text-sm">
                  <p className="font-medium text-warning">Once published:</p>
                  <ul className="list-inside list-disc space-y-1 text-warning/90">
                    <li>The test will be available for others to take</li>
                    <li>Statistics and attempt tracking will be enabled</li>
                    <li>Direct editing will be disabled</li>
                  </ul>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-primary">
            <Send className="mr-2 h-4 w-4" />
            Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
