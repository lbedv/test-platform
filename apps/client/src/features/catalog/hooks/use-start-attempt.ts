import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { startAttempt } from "../api/catalog-api";
import { toast } from "sonner"
import PathConstants from "@/routes/path-constants";

/**
 * Custom hook for starting a new test attempt.
 * Handles navigation to test attempt page and shows appropriate toast messages.
 * @returns Mutation object for starting test attempts
 */
export function useStartAttempt() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (testId: string) => startAttempt(testId),
        onError: () => {
          toast.error("This test is no longer available");
        },
        onSuccess: (data) => {
            if (data.wasResumed) {
                toast.warning("You already have an active test attempt. Resuming it now.");
            }
            navigate({ to: PathConstants.TEST_ATTEMPT });
        }
    })
}