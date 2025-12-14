# Layout System

## Overview

The platform uses a hierarchical layout system with primary and secondary layouts organized through Next.js route groups.

## Layout Hierarchy

### 1. Root Layout (`app/layout.tsx`)

- **Applies to**: All pages
- **Purpose**: Base HTML structure, fonts, global styles
- **Contains**: HTML wrapper, body, metadata

### 2. Route Group Layouts

Route groups use parentheses `(group-name)` to organize routes without affecting URLs. Each route group can have its own layout.

#### Primary Layouts (Route Groups)

##### (marketing) - Marketing/Public Pages Layout

- **Used for**: Home, About, Features, Pricing, Blog, Contact
- **Layout Component**: `MainLayout`
- **Features**:
  - Header with navigation
  - Footer
  - Full-width marketing layouts
  - Public-facing design

**Pages**:

- `/` (home)
- `/about`
- `/features`
- `/pricing`
- `/blog`
- `/contact`

##### (auth) - Authentication Layout

- **Used for**: Login, Register, Forgot Password
- **Layout**: Minimal centered layout
- **Features**:
  - No header/footer
  - Centered content
  - Focus on auth forms
  - Minimal distractions

**Pages**:

- `/login`
- `/register`
- `/forgot-password`

##### (dashboard) - Dashboard Layout

- **Used for**: Dashboard, Profile, Settings
- **Layout Component**: `DashboardLayout`
- **Features**:
  - Sidebar navigation
  - App workspace layout
  - User-focused design

**Pages**:

- `/dashboard`
- `/profile`
- `/settings`

##### (account) - Account Management Layout

- **Used for**: Account, Billing, Subscription, Notifications
- **Layout Component**: `DashboardLayout` (shared with dashboard)
- **Features**:
  - Same layout structure as dashboard
  - Account-focused navigation

**Pages**:

- `/account`
- `/billing`
- `/subscription`
- `/notifications`

##### (admin) - Admin Layout

- **Used for**: Admin dashboard, Users, Analytics, Settings
- **Layout Component**: `AdminLayout`
- **Features**:
  - Admin-specific sidebar
  - Restricted access areas
  - Admin-focused design

**Pages**:

- `/admin`
- `/admin/users`
- `/admin/analytics`
- `/admin/settings`

##### (docs) - Documentation Layout

- **Used for**: Documentation pages
- **Layout**: Docs-specific layout
- **Features**:
  - Documentation sidebar navigation
  - Readable content layout
  - Docs-focused design

**Pages**:

- `/docs`
- `/docs/[slug]`

## Layout Components

### Component Location

All layout components are in `components/layouts/`:

```
components/layouts/
├── main-layout.tsx         # Marketing/public pages
├── dashboard-layout.tsx    # App workspace pages
└── admin-layout.tsx        # Admin pages
```

### Layout Component Structure

```tsx
// Example: Dashboard Layout
export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <aside>Sidebar Navigation</aside>
      <main>{children}</main>
    </div>
  )
}
```

### Shared Components

Layouts use shared components from `components/shared/`:

- `Header` - Main navigation header
- `Footer` - Site footer
- `Sidebar` - Side navigation

## Usage Pattern

### Creating a New Layout

1. **Create layout component** in `components/layouts/`:

   ```tsx
   // components/layouts/custom-layout.tsx
   export function CustomLayout({ children }: { children: ReactNode }) {
     return <div>{children}</div>
   }
   ```

2. **Create route group** (if needed) in `app/`:

   ```tsx
   // app/(custom-group)/layout.tsx
   import { CustomLayout } from "@/components/layouts/custom-layout"

   export default function CustomGroupLayout({ children }) {
     return <CustomLayout>{children}</CustomLayout>
   }
   ```

3. **Add pages** to the route group:
   ```
   app/(custom-group)/
   ├── layout.tsx
   └── page-name/
       └── page.tsx
   ```

### Sharing Layouts Between Groups

If multiple route groups need the same layout:

- Share the layout component (e.g., `DashboardLayout`)
- Import the same component in different route group layouts

Example:

```tsx
// app/(dashboard)/layout.tsx
// app/(account)/layout.tsx
import {
  DashboardLayout,
  DashboardLayout,
} from "@/components/layouts/dashboard-layout"

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
```

## Layout Decision Tree

When adding a new page, choose the layout based on:

1. **Is it a public/marketing page?**
   → Use `(marketing)` route group → `MainLayout`

2. **Is it an authentication page?**
   → Use `(auth)` route group → Minimal centered layout

3. **Is it a main app page (dashboard/profile)?**
   → Use `(dashboard)` route group → `DashboardLayout`

4. **Is it an account management page?**
   → Use `(account)` route group → `DashboardLayout` (shared)

5. **Is it an admin page?**
   → Use `(admin)` route group → `AdminLayout`

6. **Is it documentation?**
   → Use `(docs)` route group → Docs layout

## Best Practices

1. **Reuse Layout Components**: Share layouts between route groups when appropriate
2. **Keep Layouts Focused**: Each layout should serve a specific purpose
3. **Use Route Groups**: Organize routes logically with route groups
4. **Consistent Navigation**: Use shared components (Header, Sidebar) for consistency
5. **Type Safety**: Type layout props properly with TypeScript

---

**Last Updated**: Layout system setup
**Maintained By**: Development Team
