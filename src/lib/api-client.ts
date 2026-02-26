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

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token = localStorage.getItem("auth_token")

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

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
}
