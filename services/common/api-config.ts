export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  timeout: 30000,
  retryAttempts: 3,
} as const
