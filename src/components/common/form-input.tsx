import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  type?: string
  required?: boolean
  showPasswordToggle?: boolean
  labelSuffix?: React.ReactNode
  className?: string
  inputClassName?: string
  autoComplete?: string
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  required = false,
  showPasswordToggle = false,
  labelSuffix,
  className,
  inputClassName,
  autoComplete,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type

  const inputEl = (
    <Input
      id={id}
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        error && "border-destructive focus:ring-destructive",
        showPasswordToggle && "pr-10",
        inputClassName
      )}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      autoComplete={autoComplete}
    />
  )

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className={labelSuffix ? "flex items-center justify-between" : undefined}>
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {labelSuffix}
      </div>
      {showPasswordToggle ? (
        <div className="relative">
          {inputEl}
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={
              showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`
            }
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : (
        inputEl
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
