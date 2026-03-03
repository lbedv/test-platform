import { getMockResponse } from "./mock-handlers"

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api"

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown,
    message?: string,
  ) {
    super(message ?? `API error ${status}`)
    this.name = "ApiError"
  }
}

/**
 * Centralized fetch wrapper.
 *
 * If the real API returns a network error or a non-401 server error, we
 * transparently fall back to the mock-handlers so the app stays usable
 * during development without a running backend.
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const method = options?.method ?? "GET"
  const token = localStorage.getItem("auth_token")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  let parsedBody: unknown
  if (options?.body && typeof options.body === "string") {
    try {
      parsedBody = JSON.parse(options.body)
    } catch {
      /* not JSON */
    }
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })

    if (res.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
      throw new ApiError(401, null, "Unauthorized")
    }

    if (!res.ok) {
      let body: unknown = null
      try {
        body = await res.json()
      } catch {
        /* empty */
      }
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: string }).message)
          : `Request failed with status ${res.status}`
      throw new ApiError(res.status, body, message)
    }

    if (res.status === 204) return undefined as T

    return res.json() as Promise<T>
  } catch (error) {
    // 401 should always propagate (session expired)
    if (error instanceof ApiError && error.status === 401) throw error

    // Attempt mock fallback
    const mock = await getMockResponse<T>(method, endpoint, parsedBody)
    if (mock !== null) {
      console.warn(
        `[api-client] Real API failed for ${method} ${endpoint} — using mock data.`,
        error instanceof Error ? error.message : error,
      )
      return mock
    }

    // No mock matched — rethrow so the UI shows an error state
    throw error
  }
}
