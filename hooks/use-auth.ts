import { useAuthStore } from "@/store/auth-store"

export function useAuth() {
  const { user, isAuthenticated, setUser } = useAuthStore()

  return {
    user,
    isLoading: false,
    isAuthenticated,
    setUser,
  }
}
