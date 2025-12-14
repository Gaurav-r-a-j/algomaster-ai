import { ApiError } from "@/lib/errors/api-error"

export async function handleApiError(error: unknown): Promise<never> {
  if (error instanceof ApiError) {
    throw error
  }
  if (error instanceof Error) {
    throw new ApiError(error.message, 500)
  }
  throw new ApiError("An unknown error occurred", 500)
}

export function buildQueryString(
  params: Record<string, string | number | boolean>
): string {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })
  return searchParams.toString()
}
