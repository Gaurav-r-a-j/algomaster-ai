export const ROUTES = {
  // Public routes
  HOME: "/",
  
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  
  // Dashboard routes
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",
  
  // Account routes
  ACCOUNT: "/account",
  BILLING: "/billing",
  SUBSCRIPTION: "/subscription",
  NOTIFICATIONS: "/notifications",
  
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
  
  // Shop routes
  SHOP: "/shop",
  CART: "/shop/cart",
  CHECKOUT: "/shop/checkout",
  ORDERS: "/shop/orders",
} as const;
