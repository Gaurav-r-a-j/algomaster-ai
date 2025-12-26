// localStorage utilities
export const storage = {
  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (typeof window === "undefined") {
      return defaultValue
    }
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined") {
      return
    }
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") {
      return
    }
    localStorage.removeItem(key)
  },

  clear: (): void => {
    if (typeof window === "undefined") {
      return
    }
    localStorage.clear()
  },
}

