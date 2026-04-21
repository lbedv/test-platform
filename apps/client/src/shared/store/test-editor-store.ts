import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  QuestionWithCorrectAnswerSchema,
  CreateTestRequestSchema,
  type QuestionWithCorrectAnswer,
  type CreateTestRequest,
  type AnswerOption
} from '@test-platform/shared/schemas'

// Validate test details only (no questions)
const TestDetailsSchema = CreateTestRequestSchema.omit({ questions: true })

interface ValidationError {
  field: string
  message: string
}

interface TestEditorState {
  test: CreateTestRequest
  errors: ValidationError[]

  updateTestDetails: (updates: Partial<Omit<CreateTestRequest, 'questions'>>) => void
  addQuestion: () => void
  deleteQuestion: (questionId: string) => void
  updateQuestion: (questionId: string, updates: Partial<QuestionWithCorrectAnswer>) => void
  addOption: (questionId: string) => void
  deleteOption: (questionId: string, optionId: string) => void
  updateOption: (questionId: string, optionId: string, label: string) => void

  validateTest: () => boolean
  getFieldErrors: (field: string) => string[]
  getQuestionErrors: (questionId: string) => ValidationError[]
  clearErrors: () => void
  resetTest: () => void
}

const DEFAULT_TEST: CreateTestRequest = {
  testTitle: '',
  testCategory: 'general_knowledge',
  testDifficulty: 'medium',
  timeLimitSeconds: 3600,
  passingPercentage: 70,
  description: '',
  questions: [],
}

// --- ID generators ---

function generateOptionId(): string {
  return Math.random().toString(36).slice(2, 11)
}

// --- Pure validation helpers ---

function validateTestDetails(test: Omit<CreateTestRequest, 'questions'>): ValidationError[] {
  const result = TestDetailsSchema.safeParse(test)
  if (result.success) return []
  return result.error.issues.map((issue) => ({
    field: issue.path.join('-') || issue.code,
    message: issue.message,
  }))
}

function validateQuestion(question: QuestionWithCorrectAnswer): ValidationError[] {
  const result = QuestionWithCorrectAnswerSchema.safeParse(question)
  if (result.success) return []
  return result.error.issues.map((issue) => ({
    field: `question-${question.id}-${issue.path.join('-') || issue.code}`,
    message: issue.message,
  }))
}

function validateAll(test: CreateTestRequest): ValidationError[] {
  const { questions, ...details } = test
  const questionCountError: ValidationError[] = questions.length === 0
    ? [{ field: 'questions', message: 'Test must have at least one question.' }]
    : []
  return [
    ...validateTestDetails(details),
    ...questionCountError,
    ...questions.flatMap(validateQuestion),
  ]
}

// --- Default question factory ---

function makeQuestion(questionNumber: number): QuestionWithCorrectAnswer {
  return {
    id: crypto.randomUUID(),
    questionText: '',
    questionNumber,
    pointsPossible: 10,
    questionType: 'multipleChoice',
    correctAnswer: [] as string[],
    options: [
      { id: generateOptionId(), label: '' },
      { id: generateOptionId(), label: '' },
    ],
  }
}

// --- Defaults for each question type on type change ---

function applyTypeDefaults(question: QuestionWithCorrectAnswer, newType: QuestionWithCorrectAnswer['questionType']): void {
  question.questionType = newType
  if (newType === 'multipleChoice') {
    question.correctAnswer = [] as string[]
    if (!question.options?.length) {
      question.options = [
        { id: generateOptionId(), label: '' },
        { id: generateOptionId(), label: '' },
      ]
    }
  } else {
    // trueFalse, textInput, numeric — no options or pre-set answer
    question.correctAnswer = ""
    question.options = undefined
  }
}

// --- Store ---

export const useTestEditorStore = create<TestEditorState>()(
  immer((set, get) => ({
    test: DEFAULT_TEST,
    errors: [],

    updateTestDetails: (updates) =>
      set((state) => {
        Object.assign(state.test, updates)
      }),

    addQuestion: () =>
      set((state) => {
        state.test.questions.push(makeQuestion(state.test.questions.length + 1))
      }),

    deleteQuestion: (questionId) =>
      set((state) => {
        state.test.questions = state.test.questions
          .filter((q: QuestionWithCorrectAnswer) => q.id !== questionId)
          .map((q: QuestionWithCorrectAnswer, idx: number) => ({ ...q, questionNumber: idx + 1 }))
        // Drop any errors that belonged to the deleted question
        state.errors = state.errors.filter((e) => !e.field.startsWith(`question-${questionId}`))
      }),

    updateQuestion: (questionId, updates) =>
      set((state) => {
        const question = state.test.questions.find((q: QuestionWithCorrectAnswer) => q.id === questionId)
        if (!question) return

        if (updates.questionType && updates.questionType !== question.questionType) {
          applyTypeDefaults(question, updates.questionType)
          // Remove deleted option from correctAnswer if it was selected
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { questionType, correctAnswer, options, ...rest } = updates
          Object.assign(question, rest)
          // Clear stale errors for this question on type change
          state.errors = state.errors.filter((e) => !e.field.startsWith(`question-${questionId}`))
        } else {
          Object.assign(question, updates)
        }
      }),

    addOption: (questionId) =>
      set((state) => {
        const question = state.test.questions.find((q: QuestionWithCorrectAnswer) => q.id === questionId)
        if (!question) return
        question.options ??= []
        question.options.push({ id: generateOptionId(), label: '' })
      }),

    deleteOption: (questionId, optionId) =>
      set((state) => {
        const question = state.test.questions.find((q: QuestionWithCorrectAnswer) => q.id === questionId)
        if (!question) return
        question.options = question.options?.filter((o: AnswerOption) => o.id !== optionId)
        // Remove deleted option from correctAnswer if it was selected
        if (question.questionType === 'multipleChoice' && Array.isArray(question.correctAnswer)) {
          question.correctAnswer = question.correctAnswer.filter((id: string) => id !== optionId)
        }
      }),

    updateOption: (questionId, optionId, label) =>
      set((state) => {
        const question = state.test.questions.find((q: QuestionWithCorrectAnswer) => q.id === questionId)
        if (!question) return
        const option = question.options?.find((o: AnswerOption) => o.id === optionId)
        if (option) option.label = label
      }),

    validateTest: () => {
      const errors = validateAll(get().test)
      set((s) => { s.errors = errors })
      return errors.length === 0
    },

    getFieldErrors: (field) =>
      get().errors.filter((e) => e.field === field).map((e) => e.message),

    getQuestionErrors: (questionId) =>
      get().errors.filter((e) => e.field.startsWith(`question-${questionId}`)),

    clearErrors: () => set((state) => { state.errors = [] }),

    resetTest: () => set({ test: DEFAULT_TEST, errors: [] }),
  }))
)

// --- Derived-state selectors (compute at read time, not stored) ---

export const selectTotalPoints = (state: TestEditorState) =>
  state.test.questions.reduce((sum, q) => sum + q.pointsPossible, 0)

export const selectQuestionsCount = (state: TestEditorState) =>
  state.test.questions.length