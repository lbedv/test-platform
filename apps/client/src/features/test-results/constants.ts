import type { ScoreStatus } from "./types";
import type { AnswerOutcome } from "@test-platform/shared/constants";
import type { SelectOption } from "@/shared/constants/labels";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

export const SCORE_STYLE_MAP: Record<ScoreStatus, {
  wrapper: string;
  text: string;
  badge: string;
  label: string;
  stroke: string
}> = {
  excellent: {
    wrapper: "bg-success/5",
    text: "text-success",
    badge: "bg-success/15 text-success hover:bg-success/20",
    stroke: "stroke-success",
    label: "Excellent",
  },
  passed: {
    wrapper: "bg-primary/5",
    text: "text-primary",
    badge: "bg-primary/15 text-primary hover:bg-primary/20",
    stroke: "stroke-primary",
    label: "Passed",
  },
  failed: {
    wrapper: "bg-destructive/5",
    text: "text-destructive",
    badge: "bg-destructive/15 text-destructive hover:bg-destructive/20",
    stroke: "stroke-destructive",
    label: "Needs Improvement",
  },
} as const;

export const ANSWER_ICON_MAP: Record<AnswerOutcome, { 
  label: string;
  icon: typeof CheckCircle2;
  color: string;
}> = {
  "skipped": {
    label: "Skipped",
    icon: MinusCircle,
    color: "text-warning",
  },
  "correct": {
    label: "Correct",
    icon: CheckCircle2,
    color: "text-success",
  },
  "incorrect": {
    label: "Incorrect",
    icon: XCircle,
    color: "text-destructive",
  },
} as const

export const ANSWER_STYLES_MAP: Record<AnswerOutcome, string> = {
  correct: "border-success/30 bg-success/5 text-success",
  incorrect: "border-destructive/30 bg-destructive/5 text-destructive",
  skipped: "border-warning/30 bg-warning/5 text-warning italic opacity-80",
} as const;

export const FILTER_OPTIONS: SelectOption<AnswerOutcome>[] = [
  { label: "Correct", value: "correct" },
  { label: "Incorrect", value: "incorrect" },
  { label: "Skipped", value: "skipped" }
] as const;