import { env } from "@/config/common/env"

const API_BASE_URL = env.NEXT_PUBLIC_API_URL || "/api"
const isClientOnlyMode = !env.NEXT_PUBLIC_API_URL || env.NEXT_PUBLIC_API_URL === "/api"

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  // If no backend URL is configured, return mock data for client-side only mode
  if (isClientOnlyMode && typeof window !== "undefined") {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Return mock data based on endpoint
    if (endpoint.includes("/auth/login") || endpoint.includes("/auth/register")) {
      return {
        user: { id: "demo-user", email: "demo@example.com" },
        token: "demo-token",
      } as T
    }
    
    if (endpoint.includes("/auth/logout")) {
      return { success: true } as T
    }
    
    // For other endpoints, return empty object
    return {} as T
  }

  // Real API call if backend is available
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    // If fetch fails (no backend), return mock data
    console.warn(`API call failed for ${endpoint}, using mock data:`, error)
    return {} as T
  }
}
