import { apiClient } from "@/lib/api/client"
import { handleApiError } from "@/lib/common/api-helpers"

export class BaseService {
  protected async get<T>(endpoint: string): Promise<T> {
    try {
      return await apiClient<T>(endpoint, { method: "GET" })
    } catch (error) {
      return handleApiError(error)
    }
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      return await apiClient<T>(endpoint, {
        method: "POST",
        body: data ? JSON.stringify(data) : undefined,
      })
    } catch (error) {
      return handleApiError(error)
    }
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      return await apiClient<T>(endpoint, {
        method: "PUT",
        body: data ? JSON.stringify(data) : undefined,
      })
    } catch (error) {
      return handleApiError(error)
    }
  }

  protected async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    try {
      return await apiClient<T>(endpoint, {
        method: "PATCH",
        body: data ? JSON.stringify(data) : undefined,
      })
    } catch (error) {
      return handleApiError(error)
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    try {
      return await apiClient<T>(endpoint, { method: "DELETE" })
    } catch (error) {
      return handleApiError(error)
    }
  }
}
