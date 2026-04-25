// Validates MongoDB ObjectId format
// Used before database queries to prevent invalid IDs from reaching the database
import mongoose from "mongoose";
import { createError } from "./createError.js"

// Throws error if ID is not a valid MongoDB ObjectId
export const validateObjectId = (id: string, entityName: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = createError(`Invalid ${entityName} ID`, 400);

    throw err;
  }
};