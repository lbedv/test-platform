import { apiFetch } from "@/shared/lib/api-client";
import { CatalogTestsResponseSchema, StartAttemptResponseSchema, type CatalogFilterRequest } from "@test-platform/shared/schemas";

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

export function startAttempt(testId: string) {
    return apiFetch(`/attempts/${testId}`, {
        method: "POST",
        schema: StartAttemptResponseSchema,
    })
}

export function deleteTest(testId: string) {
    return apiFetch(`/tests/${testId}`, {
        method: "DELETE",
    });
}
