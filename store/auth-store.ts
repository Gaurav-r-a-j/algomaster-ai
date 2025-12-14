import { create } from "zustand"

interface AuthState {
  user: null | { id: string; email: string }
  isAuthenticated: boolean
  setUser: (user: { id: string; email: string } | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}))
