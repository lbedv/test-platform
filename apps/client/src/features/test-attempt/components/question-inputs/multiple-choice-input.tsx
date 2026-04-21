import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// MultipleChoiceInput component - Renders a multiple choice question input using checkboxes.
export function MultipleChoiceInput({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[]
  value: string[]
  onChange: (val: string[] | undefined) => void
}) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const optionId = `option-${index}`
        const isChecked = value.includes(option.id)

        return (
          <div key={optionId} className="flex items-center space-x-3">
            <Checkbox
              id={optionId}
              checked={isChecked}
              onCheckedChange={(checked) => {
                const newSelection = checked
                    ? [...value, option.id]
                    : value.filter((o) => o !== option.id)

                onChange(newSelection.length > 0 ? newSelection : undefined)
              }}
            />
            <Label htmlFor={optionId}>{option.label}</Label>
          </div>
        )
      })}
    </div>
  )
}