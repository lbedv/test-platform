import mongoose from "mongoose";
import { createError } from "./createError.js"

export const validateObjectId = (id: string, entityName: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = createError(`Invalid ${entityName} ID`, 400);

    throw err;
  }
};