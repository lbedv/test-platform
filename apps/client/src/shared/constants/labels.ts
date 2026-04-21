import { TEST_CATEGORIES, TEST_DIFFICULTIES, type Difficulty, type Category, type QuestionType } from "@test-platform/shared/constants";

export type SelectOption<T = string> = {
  value: T;
  label: string;
};

export const DIFFICULTY_LABELS = {
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
} satisfies Record<Difficulty, string>;

export const DIFFICULTY_OPTIONS: SelectOption[] = TEST_DIFFICULTIES.map(
    (difficulty) => ({
        value: difficulty,
        label: DIFFICULTY_LABELS[difficulty],
    })
);

export const CATEGORY_LABELS = {
  general_knowledge: "General Knowledge",
  mathematics:       "Math",
  linguistics:       "Language & Linguistics",
  physics:           "Physics",
  chemistry:         "Chemistry",
  biology:           "Biology",
  history:           "History",
  geography:         "Geography",
  economics:         "Economics",
  programming:       "Coding / Programming",
  data_science:      "Data Science",
  medicine:          "Medicine",
  law:               "Law",
  music:             "Music",
  art:               "Art",
  other:             "Other",
} satisfies Record<Category, string>;

export const CATEGORY_OPTIONS: SelectOption[] = TEST_CATEGORIES.map(
  (category) => ({
    value: category,
    label: CATEGORY_LABELS[category], 
  })
);

// Human-readable labels for each question type
export const QUESTION_TYPE_LABELS = {
  multipleChoice: "Multiple Choice",
  trueFalse: "True / False",
  textInput: "Text Input",
  numeric: "Numeric",
} satisfies Record<QuestionType, string>;