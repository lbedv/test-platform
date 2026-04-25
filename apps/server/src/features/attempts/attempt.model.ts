// Test attempt data model - stores user responses and scoring for test completions
import mongoose from 'mongoose';
import { QUESTION_TYPES, ANSWER_OUTCOME, ATTEMPT_STATUS, QuestionType, AnswerOutcome, AttemptStatus } from '@test-platform/shared/constants';
import { AnswerType } from '@test-platform/shared/schemas';
import { User } from '../users/user.model';
import { Test, ITest } from '../tests/test.model';
import { Types } from 'mongoose';

// Single answer response in an attempt
export interface IAnswer {
  id: string;
  answerOutcome: AnswerOutcome;
  questionType: QuestionType;
  userAnswer?: AnswerType;
}

// Test attempt document interface
export interface IAttempt {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  testId: mongoose.Types.ObjectId;
  status: AttemptStatus;
  completedAt: Date;
  timeTakenSeconds: number;
  pointsEarned: number;
  percentage: number;
  isPassed: boolean;
  answers: Types.DocumentArray<IAnswer>;
  createdAt: Date;
  expiresAt: Date;
}

// Attempt document with populated test details
export interface PopulatedAttempt extends Omit<IAttempt, 'testId'> {
  testId: ITest
}

// Attempt statistics used for leaderboards and dashboards
export interface AttemptStats {
  _id: mongoose.Types.ObjectId;
  userId: {
    firstName: string;
    lastName: string;
  };
  completedAt: Date;
  percentage: number;
  pointsEarned: number;
  timeTakenSeconds: number;
  isPassed: boolean;
}


const AnswerSchema = new mongoose.Schema<IAnswer>({
  id: { type: String, required: true },
  answerOutcome: {
    type: String,
    required: true,
    enum: ANSWER_OUTCOME
  },
  questionType: { 
  type: String, 
  required: true,
  enum: QUESTION_TYPES
},
  userAnswer: { type: mongoose.Schema.Types.Mixed, required: false },
}, { _id: false });

export const AttemptSchema = new mongoose.Schema<IAttempt>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
    testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Test,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ATTEMPT_STATUS
  },
  expiresAt: { type: Date, required: true },
  completedAt: { type: Date },
  timeTakenSeconds: { type: Number, required: true, default: 0 },
  pointsEarned: { type: Number, required: true, default: 0 },
  percentage: { type: Number, required: true, default: 0 },
  isPassed: { type: Boolean, required: true, default: false },
  answers: { type: [AnswerSchema], required: true }
}, { _id: true, timestamps: true });

export const Attempt = mongoose.model<IAttempt>("Attempt", AttemptSchema);