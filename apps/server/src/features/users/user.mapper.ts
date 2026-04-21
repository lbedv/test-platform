import { IUser } from "./user.model.js";
import { AuthSuccessResponse } from "@test-platform/shared/schemas"

export const toAuthResponse = (user: IUser) : AuthSuccessResponse => ({
  id: user._id.toString(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  createdAt: user.createdAt.toString(),
});