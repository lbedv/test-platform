// User data mapper - transforms database documents to API response formats
import { IUser } from "./user.model.js";
import { AuthSuccessResponse } from "@test-platform/shared/schemas"

// Transform user document to authentication response (for login/register)
export const toAuthResponse = (user: IUser) : AuthSuccessResponse => ({
  id: user._id.toString(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
  createdAt: user.createdAt.toString(),
});