import { useMutation } from "@tanstack/react-query";
import { createTest } from "../api/editor-api";
import { useTestEditorStore } from "@/shared/store/test-editor-store";
import { toast } from "sonner";
import type { CreateTestRequest } from "@test-platform/shared/schemas";
import { queryKeys } from "@/shared/lib/query-keys";
import { queryClient } from "@/shared/lib/query-client";

/**
 * Custom hook for publishing/creating new tests.
 * Resets editor state on success and invalidates relevant queries.
 * @returns Mutation object for publishing tests
 */
export function usePublishTest() {
  const { resetTest, clearErrors } = useTestEditorStore();

  return useMutation({
    mutationFn: (testData: CreateTestRequest) => createTest(testData),
    onError: (error) => {
      console.error("Failed to publish test:", error);
      toast.error("Failed to publish the test. Please try again.");
    },
    onSuccess: () => {
      toast.success(`Test published successfully!`);
      resetTest();
      clearErrors();
      queryClient.invalidateQueries({ queryKey: queryKeys.catalog.list({}) });
      queryClient.invalidateQueries({queryKey: queryKeys.dashboard.stats() });
      queryClient.invalidateQueries({queryKey: queryKeys.statistics.userTests() });
    },
  });
}