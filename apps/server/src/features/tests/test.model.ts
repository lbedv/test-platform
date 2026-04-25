// Test data model - stores test/quiz documents with questions and statistics
import mongoose from "mongoose";
import { User } from "../users/user.model.js";
import { QUESTION_TYPES, TEST_CATEGORIES, TEST_DIFFICULTIES, QuestionType, Category, Difficulty } from "@test-platform/shared/constants";
import { AnswerType, AnswerOption } from "@test-platform/shared/schemas";

// Single question within a test
export interface IQuestion {
  id: string;
  questionText: string;
  questionNumber: number;
  pointsPossible: number;
  questionType: QuestionType;
  correctAnswer: AnswerType;
  options?: AnswerOption[];
}

// Test document interface
export interface ITest {
  _id: mongoose.Types.ObjectId;
  testTitle: string;
  testCategory: Category;
  testDifficulty: Difficulty;
  totalPoints: number;
  timeLimitSeconds: number;
  passingPercentage: number;
  questionsCount: number;
  description: string;
  attemptsCount: number;
  questions: IQuestion[];
  userId: mongoose.Types.ObjectId;
  // Stats counters (denormalized for performance - cached from attempts)
  totalAttempts: number;
  totalScore: number;
  totalTimeTaken: number;
  passedAttempts: number;
  createdAt: Date;
  deletedAt?: Date | null;
};
// Test document with populated user details

export interface PopulatedTest extends Omit<ITest, 'userId'> {
  userId: {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
  };
};

const AnswerOptionSchema = new mongoose.Schema<AnswerOption>({
  id: { type: String, required: true },
  label: { type: String, required: true },
}, { _id: false });

const QuestionSchema = new mongoose.Schema<IQuestion>({
  id: { type: String, required: true },
  questionText: { type: String, required: true },
  questionNumber: { type: Number, required: true },
  pointsPossible: { type: Number, required: true },
  questionType: { 
    type: String, 
    required: true,
    enum: QUESTION_TYPES
  },
    correctAnswer: { type: mongoose.Schema.Types.Mixed, required: true },
    options: { 
      type: [AnswerOptionSchema],
      required: function() { 
        return this.questionType === 'multipleChoice'; 
      }
    } 
}, { _id: false });

export const TestSchema = new mongoose.Schema<ITest>({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: User, 
    required: true
 },
  testTitle: { type: String, required: true },
  testCategory: { type: String, required: true, enum: TEST_CATEGORIES },
  testDifficulty: { type: String, required: true, enum: TEST_DIFFICULTIES },
  totalPoints: { type: Number, required: true },
  timeLimitSeconds: { type: Number, required: true },
  passingPercentage: { type: Number, required: true },
  questionsCount: { type: Number, required: true },
  description: { type: String, required: true },
  attemptsCount: { type: Number, required: true, default: 0 },
  questions: { type: [QuestionSchema], required: true },
  // Stats counters (denormalized for performance)
  totalAttempts: { type: Number, required: true, default: 0 },
  totalScore: { type: Number, required: true, default: 0 },
  totalTimeTaken: { type: Number, required: true, default: 0 },
  passedAttempts: { type: Number, required: true, default: 0 },
  deletedAt: { type: Date, default: null }
}, {  _id: true, timestamps: true });

export const Test = mongoose.model<ITest>("Test", TestSchema);