import { Input } from "@/components/ui/input"

// NumericInput component - Renders a numeric input field for questions.
export function NumericInput({
  value,
  onChange,
}: {
  value: number | undefined
  onChange: (val: number | undefined) => void
}) {
  return (
    <Input
      type="number"
      value={value ?? ""}
      placeholder="Enter your answer..."
      onChange={(e) => {
        const val = e.target.value
        onChange(val === "" ? undefined : Number(val))
      }}
      className="max-w-xs"
    />
  )
}