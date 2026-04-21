import { apiFetch } from "@/shared/lib/api-client";
import type { CreateTestRequest } from "@test-platform/shared/schemas";

export const createTest = async (testData: CreateTestRequest) => {
  return apiFetch("/tests", {
    method: "POST",
    body: JSON.stringify(testData),
  });
};
