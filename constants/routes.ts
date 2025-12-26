// Extensible route structure for multiple interview topics
export const ROUTES = {
  // Public routes
  HOME: "/",

  // Category-based routes (extensible)
  // Format: /{category}/{topic-slug}
  // Examples: /dsa/bubble-sort, /frontend/react-hooks, /system-design/caching
  TOPIC: (categoryId: string, topicSlug: string) => `/${categoryId}/${topicSlug}`,
  
  // Category and module routes
  CATEGORY: (categoryId: string) => `/${categoryId}`,
  MODULE: (slug: string) => `/dsa/${slug}`,

  // Dashboard routes (separate for stats/progress)
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Account routes
  ACCOUNT: "/account",
  BILLING: "/billing",
  SUBSCRIPTION: "/subscription",
  NOTIFICATIONS: "/notifications",

  // Authentication routes (OAuth only - GitHub & LinkedIn)
  LOGIN: "/login",
  REGISTER: "/register",
  AUTH_CALLBACK: "/auth/callback", // OAuth callback

  // Marketing routes
  ABOUT: "/about",
  CONTACT: "/contact",
  PRICING: "/pricing",
  FEATURES: "/features",
  BLOG: "/blog",

  // Admin routes
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_SETTINGS: "/admin/settings",

  // Docs routes
  DOCS: "/docs",

  // Design System
  DESIGN_SYSTEM: "/design-system",
} as const
