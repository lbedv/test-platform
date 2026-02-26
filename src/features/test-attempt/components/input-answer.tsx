import type { TestAnswer } from "../types"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface InputAnswerProps {
  questionId: string
  value: string
  onAnswerChange: (answer: TestAnswer) => void
  currentAnswer: TestAnswer
  type?: "text" | "number"
}

export function InputAnswer({
  questionId,
  value,
  onAnswerChange,
  currentAnswer,
  type = "text",
}: InputAnswerProps) {
  const handleInputChange = (text: string) => {
    onAnswerChange({
      ...currentAnswer,
      textAnswer: text,
    })
  }

  const isNumeric = type === "number"
  const inputClasses = isNumeric ? "max-w-xs text-center text-lg h-12" : "min-h-32 resize-none text-base"
  
  return (
    <div className={`flex flex-col ${isNumeric ? "items-center" : ""} gap-2`}>
      <Label htmlFor={`answer-${questionId}`} className="sr-only">
        {isNumeric ? "Your numeric answer" : "Your answer"}
      </Label>
      {isNumeric ? (
        <Input
          id={`answer-${questionId}`}
          type="number"
          placeholder="Enter a number..."
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className={inputClasses}
          autoFocus
        />
      ) : (
        <Textarea
          id={`answer-${questionId}`}
          placeholder="Type your answer here..."
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className={inputClasses}
          autoFocus
        />
      )}
      <p className="text-xs text-muted-foreground text-right">
        {isNumeric ? (
          "Enter a numeric value"
        ) : value.length > 0 ? (
          `${value.length} characters`
        ) : (
          "Start typing your response"
        )}
      </p>
    </div>
  )
}
