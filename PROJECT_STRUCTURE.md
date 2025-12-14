# Project Structure Documentation

This document outlines the complete folder structure and conventions for this Next.js application.

## 📁 Root Directory Structure

```
next-web-app/
├── app/                    # Next.js App Router directory
├── components/             # React components
├── hooks/                  # Custom React hooks
├── lib/                    # Library code and utilities
├── services/               # API service layer
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── constants/              # Application constants
├── config/                 # Configuration files
├── store/                  # State management (Zustand)
├── middleware/             # Next.js middleware
├── tests/                  # Test files
├── public/                 # Static assets
└── styles/                 # Global styles
```

## 📂 Detailed Folder Structure

### `/app` - Next.js App Router

The `app` directory follows Next.js 13+ App Router conventions with route groups for organization.

```
app/
├── (auth)/                 # Route group for authentication pages
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx
├── (dashboard)/            # Route group for dashboard pages
│   ├── layout.tsx          # Shared layout for dashboard routes
│   ├── dashboard/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── settings/
│       └── page.tsx
├── (account)/              # Route group for account management
│   ├── layout.tsx
│   ├── account/
│   │   └── page.tsx
│   ├── billing/
│   │   └── page.tsx
│   ├── subscription/
│   │   └── page.tsx
│   └── notifications/
│       └── page.tsx
├── (marketing)/            # Route group for marketing pages
│   ├── layout.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── features/
│   │   └── page.tsx
│   └── blog/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── (admin)/                # Route group for admin pages
│   ├── layout.tsx
│   └── admin/
│       ├── page.tsx
│       ├── users/
│       │   └── page.tsx
│       ├── analytics/
│       │   └── page.tsx
│       └── settings/
│           └── page.tsx
├── (docs)/                 # Route group for documentation
│   ├── layout.tsx
│   └── docs/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── (shop)/                 # Route group for e-commerce/shop
│   ├── layout.tsx
│   └── shop/
│       ├── page.tsx
│       ├── products/
│       │   └── [id]/
│       │       └── page.tsx
│       ├── cart/
│       │   └── page.tsx
│       ├── checkout/
│       │   └── page.tsx
│       └── orders/
│           └── page.tsx
├── api/                    # API routes
│   └── health/
│       └── route.ts
├── layout.tsx              # Root layout
├── page.tsx                # Home page
├── globals.css             # Global styles
├── error.tsx               # Error boundary
├── loading.tsx             # Loading UI
└── not-found.tsx           # 404 page
```

**Route Groups**: `(auth)` and `(dashboard)` are route groups - they organize routes without affecting the URL structure.

### `/components` - React Components

Components are organized by purpose and reusability.

```
components/
├── ui/                     # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── features/               # Feature-specific components
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   └── dashboard/
│       └── dashboard-stats.tsx
├── layouts/                # Layout components
│   ├── main-layout.tsx
│   └── dashboard-layout.tsx
├── shared/                 # Shared/common components
│   ├── header.tsx
│   ├── footer.tsx
│   └── sidebar.tsx
└── common/                 # Common reusable components
    ├── loading-spinner.tsx
    ├── error-message.tsx
    └── success-message.tsx
```

**Component Organization**:
- `ui/`: Base UI components from shadcn/ui
- `features/`: Feature-specific components organized by domain
- `layouts/`: Page layout components
- `shared/`: Shared UI components used across features
- `common/`: Common utility components (spinners, messages, etc.)

### `/hooks` - Custom React Hooks

```
hooks/
├── common/                 # Common reusable hooks
│   ├── use-debounce.ts
│   └── use-local-storage.ts
├── use-auth.ts             # Authentication hook
└── use-media-query.ts      # Media query hook
```

**Naming Convention**: All hooks start with `use-` prefix.

### `/lib` - Library Code

Core library code and business logic utilities.

```
lib/
├── api/                    # API client code
│   └── client.ts
├── common/                 # Common library utilities
│   ├── api-helpers.ts
│   └── constants.ts
├── errors/                 # Custom error classes
│   └── api-error.ts
├── validations/            # Zod validation schemas
│   └── auth.ts
└── utils.ts                # Utility re-exports
```

### `/services` - API Service Layer

Service layer for API interactions.

```
services/
├── common/                 # Common service utilities
│   ├── base-service.ts     # Base service class
│   └── api-config.ts       # API configuration
└── auth-service.ts         # Authentication service
```

**Service Pattern**: Services extend `BaseService` for consistent API handling.

### `/types` - TypeScript Types

```
types/
├── common/                 # Common types
│   └── index.ts            # BaseEntity, PaginationParams, etc.
├── user.ts                 # User-related types
└── api.ts                  # API response types
```

### `/utils` - Utility Functions

Pure utility functions organized by category.

```
utils/
├── common/                 # Common utilities
│   ├── class-names.ts      # cn() for Tailwind
│   ├── debounce.ts
│   └── throttle.ts
├── format-date.ts          # Date formatting
└── format-currency.ts      # Currency formatting
```

### `/constants` - Application Constants

```
constants/
├── common/                 # Common constants
│   └── messages.ts         # UI messages
├── routes.ts               # Route paths
└── env.ts                  # Environment variables
```

### `/config` - Configuration

```
config/
└── common/
    └── env.ts              # Validated environment configuration
```

### `/store` - State Management

```
store/
└── auth-store.ts           # Zustand store for authentication
```

### `/tests` - Test Files

```
tests/
├── __mocks__/              # Mock files
│   └── file-mock.ts
├── __tests__/              # Test files
│   └── utils/
│       └── format-date.test.ts
└── setup/                  # Test setup files
    └── test-setup.ts
```

**Test Naming**: Use `.test.ts` or `.spec.ts` suffix. Test files mirror source structure.

### `/public` - Static Assets

```
public/
├── *.svg                   # SVG icons and images
└── ...                     # Other static assets
```

## 📝 File Naming Conventions

### Files and Folders

- **kebab-case** for all files and folders: `login-form.tsx`, `use-auth.ts`, `api-client.ts`
- **Exceptions**: 
  - Next.js special files: `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`
  - Config files: `package.json`, `tsconfig.json`, `next.config.ts`

### Components

- **PascalCase** for component names: `LoginForm`, `DashboardStats`
- **kebab-case** for file names: `login-form.tsx`, `dashboard-stats.tsx`

### Functions and Variables

- **camelCase** for functions and variables: `handleSubmit`, `userData`, `isLoading`

### Constants

- **UPPER_SNAKE_CASE** for constants: `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`
- **PascalCase** for exported constant objects: `ROUTES`, `MESSAGES`

### Types and Interfaces

- **PascalCase** for types and interfaces: `User`, `ApiResponse`, `LoginInput`

## 🧪 Testing Conventions

### Test File Naming

- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.e2e.test.ts`

### Test Structure

```typescript
describe("ComponentName or FunctionName", () => {
  it("should do something specific", () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 🔧 Import Conventions

### Import Order

1. External dependencies (React, Next.js, third-party)
2. Internal absolute imports (starting with `@/`)
3. Relative imports
4. Type imports (using `import type`)

### Example

```typescript
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth-service";

import type { User } from "@/types/user";
```

## 📦 Common Subfolders Pattern

Many directories use a `common/` subfolder for shared utilities:

- `lib/common/` - Common library utilities
- `services/common/` - Common service patterns
- `types/common/` - Common type definitions
- `utils/common/` - Common utility functions
- `hooks/common/` - Common hooks
- `components/common/` - Common components
- `constants/common/` - Common constants
- `config/common/` - Common configuration

This pattern allows for:
- Shared code across different domains
- Consistent patterns and utilities
- Easy discovery of reusable code
- Better code organization

## 🎯 Best Practices

1. **Keep components small and focused** - Single Responsibility Principle
2. **Use TypeScript strictly** - Enable strict mode in `tsconfig.json`
3. **Validate environment variables** - Use Zod schemas in `config/common/env.ts`
4. **Handle errors gracefully** - Use custom error classes and error boundaries
5. **Write tests** - Aim for good test coverage, especially for utilities
6. **Use route groups** - Organize routes without affecting URLs
7. **Follow the common folder pattern** - Use `common/` subfolders for shared code
8. **Keep services organized** - Extend `BaseService` for consistency
9. **Document complex logic** - Add comments for non-obvious code
10. **Use absolute imports** - Prefer `@/` imports over relative imports

## 🔗 Related Documentation

- See `AI_REFERENCE.md` for AI assistant guidelines
- See `README.md` for setup and development instructions

