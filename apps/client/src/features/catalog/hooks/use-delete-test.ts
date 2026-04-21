import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTest } from "../api/catalog-api";
import { queryKeys } from "@/shared/lib/query-keys";
import { toast } from "sonner";

export function useDeleteTest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (testId: string) => deleteTest(testId),
        onError: (error) => {
            console.error("Failed to delete test:", error);
            toast.error("Failed to delete the test. Please try again.");
        },
        onSuccess: () => {
            toast.success("Test deleted successfully.");
            // Invalidate catalog queries to refresh the list
            queryClient.invalidateQueries({ queryKey: queryKeys.catalog.list({}) });
        }
    });
}
