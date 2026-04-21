import { useState, forwardRef } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/shared/lib/utils"

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  showPasswordToggle?: boolean
  inputClassName?: string
}

/**
 * A reusable form input component that supports various types, 
 * validation states, and an optional password visibility toggle.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      error,
      type = "text",
      required = false,
      showPasswordToggle = false,
      disabled = false,
      className,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type

    return (
      <div className={cn("flex flex-col gap-1.5", className, disabled && "opacity-50")}>
        <Label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <div className="relative w-full">
          <Input
            id={id}
            type={inputType}
            disabled={disabled}
            className={cn(
              error && "border-destructive focus:ring-destructive",
              showPasswordToggle && "pr-10",
              inputClassName
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            ref={ref}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed"
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
          )}
        </div>
        {error && (
          <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
FormInput.displayName = "FormInput"