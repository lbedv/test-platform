import { apiFetch } from "@/lib/api-client"
import type { CatalogTest } from "../types"

export interface CatalogParams {
  search?: string
  category?: string
  difficulty?: string
  sortBy?: string
  ownership?: string
  page?: number
  limit?: number
}

export interface CatalogResponse {
  items: CatalogTest[]
  total: number
  page: number
  totalPages: number
}

export function getCatalogTests(params: CatalogParams) {
  const qs = new URLSearchParams()

  if (params.search) qs.set("search", params.search)
  if (params.category && params.category !== "All Categories")
    qs.set("category", params.category)
  if (params.difficulty && params.difficulty !== "all")
    qs.set("difficulty", params.difficulty)
  if (params.sortBy) qs.set("sortBy", params.sortBy)
  if (params.ownership && params.ownership !== "all")
    qs.set("ownership", params.ownership)
  if (params.page) qs.set("page", String(params.page))
  if (params.limit) qs.set("limit", String(params.limit))

  const query = qs.toString()
  return apiFetch<CatalogResponse>(`/catalog${query ? `?${query}` : ""}`)
}
