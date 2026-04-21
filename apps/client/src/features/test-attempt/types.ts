import type { AnswerType } from "@test-platform/shared/schemas";

// Maps each question type to the shape of its answer
export type AnswerMap = {
  numeric: number;
  trueFalse: boolean;
  multipleChoice: string[];
  textInput: string;
};

export interface Answer {
    id: string;
    userAnswer?: AnswerType;
}
// GridQuestion interface - Represents a question in the grid layout of the test attempt UI
export interface GridQuestion {
    id: string,
    number: number,
    originalIndex: number
}
