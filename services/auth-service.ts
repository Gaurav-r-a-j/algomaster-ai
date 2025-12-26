// Auth Service - GitHub Only (Developer-Focused)
// No email/password - only GitHub OAuth for simplicity

import { useAuthStore } from "@/store/auth-store"

// Check if database is available
const hasDatabase = !!process.env.DATABASE_URL

// Dynamically import database services only if database is available
let userService: typeof import("@/db/services").userService | null = null

if (hasDatabase && typeof window === "undefined") {
  // Only import on server-side
  import("@/db/services").then((services) => {
    userService = services.userService
  }).catch(() => {
    // Database not available, continue with client-side only
    userService = null
  })
}

// Auth service - GitHub only, works with or without database
class AuthService {
  // Initialize auth from localStorage on app load
  initializeAuth() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("auth_user")
      if (stored) {
        try {
          const user = JSON.parse(stored)
          useAuthStore.getState().setUser(user)
        } catch (e) {
          // Invalid data, clear it
          localStorage.removeItem("auth_user")
        }
      }
    }
  }

  // Logout - clear state
  async logout() {
    // Clear Zustand store
    useAuthStore.getState().setUser(null)

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_user")
    }

    return { success: true }
  }

  // Refresh token - for client-side only mode
  async refreshToken() {
    // For client-side only, just return success
    return { success: true, token: "demo-token" }
  }
}

export const authService = new AuthService()

// Initialize auth on module load (client-side only)
if (typeof window !== "undefined") {
  authService.initializeAuth()
}
