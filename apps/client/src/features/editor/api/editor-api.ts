import { apiFetch } from "@/shared/lib/api-client";
import type { CreateTestRequest } from "@test-platform/shared/schemas";

/**
 * Creates a new test with the provided test data.
 * @param testData - The test creation request data
 * @returns Promise resolving to created test response
 */
export const createTest = async (testData: CreateTestRequest) => {
  return apiFetch("/tests", {
    method: "POST",
    body: JSON.stringify(testData),
  });
};
