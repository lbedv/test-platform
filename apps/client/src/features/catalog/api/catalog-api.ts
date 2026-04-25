import { apiFetch } from "@/shared/lib/api-client";
import { CatalogTestsResponseSchema, StartAttemptResponseSchema, type CatalogFilterRequest } from "@test-platform/shared/schemas";

/**
 * Fetches a list of tests from the catalog with optional filtering and pagination.
 * @param params - Filter parameters for the catalog query
 * @returns Promise resolving to catalog tests response
 */
export const fetchCatalogTests = async (params: CatalogFilterRequest) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, String(value));
    }
  });

  return apiFetch(`/tests?${queryParams.toString()}`, {
    schema: CatalogTestsResponseSchema,
  });
};

/**
 * Starts a new attempt for a specific test.
 * @param testId - The ID of the test to start an attempt for
 * @returns Promise resolving to start attempt response
 */
export function startAttempt(testId: string) {
    return apiFetch(`/attempts/${testId}`, {
        method: "POST",
        schema: StartAttemptResponseSchema,
    })
}

/**
 * Deletes a test from the catalog.
 * @param testId - The ID of the test to delete
 * @returns Promise resolving to delete response
 */
export function deleteTest(testId: string) {
    return apiFetch(`/tests/${testId}`, {
        method: "DELETE",
    });
}
