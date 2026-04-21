import { QueryClient } from "@tanstack/react-query"
import { ApiError } from "./api-client";

/**
 * Configured TanStack Query client with global defaults:
 * - Queries: 5 minute stale time, 10 minute garbage collection time
 * - Mutations: No retries by default
 * - Intelligent retry logic that avoids retrying on 4xx errors
 * This provides reliable data fetching with automatic retry and caching behavior
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: unknown) => {
        const apiError = error as ApiError;

        if (apiError?.status === 404 || apiError?.status === 401 || apiError?.status === 403) {
          return false;
        }
        if (apiError?.message?.includes('404') || apiError?.message?.includes('401')) {
          return false;
        }
        
        return failureCount < 2; 
      },
      retryDelay: (attemptIndex) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 0,
      retryDelay: (attemptIndex) =>
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})
