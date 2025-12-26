// Extensible route structure for multiple interview topics
export const ROUTES = {
  // Public routes
  HOME: "/",

  // Category-based routes (extensible)
  // Format: /{category}/{topic-slug}
  // Examples: /dsa/bubble-sort, /frontend/react-hooks, /system-design/caching
  TOPIC: (categoryId: string, topicSlug: string) => `/${categoryId}/${topicSlug}`,
  
  // Category landing pages
  CATEGORY: (categoryId: string) => `/${categoryId}`,
  
  // Legacy routes (backward compatibility - redirects to /dsa/{slug})
  LEGACY_TOPIC: (slug: string) => `/dsa/${slug}`,
  LEGACY_MODULE: (slug: string) => `/dsa/${slug}`,

  // Dashboard routes (separate for stats/progress)
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Account routes
  ACCOUNT: "/account",
  BILLING: "/billing",
  SUBSCRIPTION: "/subscription",
  NOTIFICATIONS: "/notifications",

  // Authentication routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFY_EMAIL: "/verify-email",
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
