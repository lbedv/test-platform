import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// TrueFalseInput component - Renders a true/false question input using radio buttons.
export function TrueFalseInput({
  value,
  onChange,
}: {
  value: boolean | undefined;
  onChange: (val: boolean | undefined) => void;  // ← allow undefined here too
}) {
  return (
    <div className="space-y-3">
      <RadioGroup
        value={value === undefined ? undefined : String(value)}
        onValueChange={(val) => onChange(val === "true")}
        className="space-y-1"
      >
        {["true", "false"].map((val) => (
          <Label
            key={val}
            htmlFor={val}
            className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              value === (val === "true")
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
          >
            <RadioGroupItem value={val} id={val} />
            <span className="capitalize">{val}</span>
          </Label>
        ))}
      </RadioGroup>

      {value !== undefined && (
        <button
          type="button"
          onClick={() => onChange(undefined)}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Clear answer
        </button>
      )}
    </div>
  );
}