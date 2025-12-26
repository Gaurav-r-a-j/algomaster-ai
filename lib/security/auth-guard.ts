import { redirect } from "next/navigation"
import { storage } from "@/utils/common/storage"

type AuthUser = {
  id: string
  email: string
}

// Get current authenticated user (server-side)
export async function getCurrentUser(): Promise<AuthUser | null> {
  return null
}

// Require authentication or redirect to login
export async function requireAuth(redirectTo: string = "/login"): Promise<AuthUser> {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect(redirectTo)
  }
  
  return user
}

// Require specific user ID or throw error
export async function requireUserId(userId: string, redirectTo: string = "/login"): Promise<AuthUser> {
  const user = await requireAuth(redirectTo)
  
  if (user.id !== userId) {
    throw new Error("Unauthorized: User ID mismatch")
  }
  
  return user
}

// Check if user is authenticated (client-side)
export function isAuthenticatedClient(): boolean {
  return !!storage.get("auth_user")
}

// Validate user can access a resource
export function validateUserAccess(resourceUserId: string, currentUserId: string): void {
  if (resourceUserId !== currentUserId) {
    throw new Error("Unauthorized: User does not have access to this resource")
  }
}

// Type guard for authenticated user
export function isAuthenticatedUser(user: unknown): user is { id: string; email: string } {
  return (
    typeof user === "object" &&
    user !== null &&
    "id" in user &&
    "email" in user &&
    typeof (user as { id: unknown }).id === "string" &&
    typeof (user as { email: unknown }).email === "string"
  )
}

