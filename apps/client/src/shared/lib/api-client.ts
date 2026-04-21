import { z, type ZodType } from "zod"

// Base URL with a local fallback
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api"

// Custom error class for non-2xx HTTP responses
export class ApiError extends Error {
  public status: number;
  public body: unknown;

  constructor(
    status: number,
    body: unknown,
    message?: string,
  ) {
    super(message ?? `API error ${status}`)
    this.name = "ApiError"
    this.status = status
    this.body = body // Stores original server error response
  }
}

// Extends native fetch options with an optional Zod validation schema
interface ApiFetchOptions<TSchema extends ZodType | undefined>
  extends RequestInit {
  schema?: TSchema
}

// Main API fetch wrapper
export async function apiFetch<TOutput = unknown, TSchema extends ZodType | undefined = undefined>(
  endpoint: string,
  options: ApiFetchOptions<TSchema> = {},
): Promise<TSchema extends ZodType ? z.infer<TSchema> : TOutput> {
  
  // Default to JSON, but allow header overrides
  const headers: HeadersInit = {
    ...(options.body != null && { "Content-Type": "application/json" }),
    ...options.headers,
  }

  // Execute request (sends cookies by default)
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", 
  })

  // Handle other HTTP errors (4xx, 5xx)
  if (!res.ok) {
    let body: unknown = null
    try {
      body = await res.json()
    } catch {
      /* ignore non-JSON error bodies (e.g., HTML) */
    }
    
    // Extract server message or use a fallback
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: string }).message)
        : `Request failed with status ${res.status}`
        
    throw new ApiError(res.status, body, message)
  }

  // Skip JSON parsing for "No Content" responses
  if (res.status === 204) {
    return undefined as TSchema extends ZodType
      ? z.infer<TSchema>
      : TOutput
  }

  // Parse successful response (assumes JSON format)
  const json = (await res.json()) as unknown

  // Validate and type-cast using Zod schema if provided
    if (options.schema) {
      try {
        return options.schema.parse(json) as TSchema extends ZodType
          ? z.infer<TSchema>
          : TOutput;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("Zod Validation Error:", error.format());
          
          throw new ApiError(
            500,
            error,
            "Invalid data format received from server"
          );
        }
        
        throw error;
      }
    }

  // Return raw JSON if no schema is used
  return json as TSchema extends ZodType
    ? z.infer<TSchema>
    : TOutput
}