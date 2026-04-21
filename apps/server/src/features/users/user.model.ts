import mongoose from "mongoose";

export type UserRole = "USER" | "ADMIN";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  stats: {
    totalTestsTaken: number
    totalScore: number
    testsCreated: number
    recentActivity: string
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    stats: {
      totalTestsTaken: { type: Number, default: 0 },
      totalScore: { type: Number, default: 0 }, // Sum of all attempt percentages
      testsCreated: { type: Number, default: 0 },
      recentActivity: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
