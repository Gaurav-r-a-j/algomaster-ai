// Auth Service - GitHub Only (Developer-Focused)
// No email/password - only GitHub OAuth for simplicity

import { useAuthStore } from "@/store/auth-store"
import { storage } from "@/utils/common/storage"

const hasDatabase = !!process.env.DATABASE_URL

let userService: typeof import("@/db/services").userService | null = null

if (hasDatabase && typeof window === "undefined") {
  import("@/db/services").then((services) => {
    userService = services.userService
  }).catch(() => {
    userService = null
  })
}

class AuthService {
  initializeAuth() {
    const stored = storage.get<{ id: string; email: string; name?: string }>("auth_user")
    if (stored) {
      try {
        useAuthStore.getState().setUser(stored)
      } catch (e) {
        storage.remove("auth_user")
      }
    }
  }

  async logout() {
    useAuthStore.getState().setUser(null)
    storage.remove("auth_user")
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
