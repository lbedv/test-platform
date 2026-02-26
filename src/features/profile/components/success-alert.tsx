import { CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SuccessAlertProps {
  message: string
}

export function SuccessAlert({ message }: SuccessAlertProps) {
  return (
    <Alert className="border-success/30 bg-success/5">
      <CheckCircle2 className="h-4 w-4 text-success" />
      <AlertDescription className="text-success">
        {message}
      </AlertDescription>
    </Alert>
  )
}
