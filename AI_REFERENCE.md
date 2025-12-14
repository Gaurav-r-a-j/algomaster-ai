# AI Assistant Reference Guide

This document provides comprehensive information about the project structure, conventions, and patterns for AI assistants working on this codebase.

## 🎯 Project Overview

This is a **Next.js 16** application using:
- **App Router** (Next.js 13+ routing)
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Zustand** for state management
- **Zod** for validation
- **pnpm** as package manager

## 📁 Complete Folder Structure Reference

```
next-web-app/
│
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route group - auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/              # Route group - dashboard pages
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── profile/page.tsx
│   │   └── settings/page.tsx
│   ├── (account)/                # Route group - account pages
│   │   ├── layout.tsx
│   │   ├── account/page.tsx
│   │   ├── billing/page.tsx
│   │   ├── subscription/page.tsx
│   │   └── notifications/page.tsx
│   ├── (marketing)/              # Route group - marketing pages
│   │   ├── layout.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── features/page.tsx
│   │   └── blog/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (admin)/                  # Route group - admin pages
│   │   ├── layout.tsx
│   │   └── admin/
│   │       ├── page.tsx
│   │       ├── users/page.tsx
│   │       ├── analytics/page.tsx
│   │       └── settings/page.tsx
│   ├── (docs)/                   # Route group - documentation
│   │   ├── layout.tsx
│   │   └── docs/
│   │       ├── page.tsx
│   │       └── [slug]/page.tsx
│   ├── (shop)/                   # Route group - shop/e-commerce
│   │   ├── layout.tsx
│   │   └── shop/
│   │       ├── page.tsx
│   │       ├── products/[id]/page.tsx
│   │       ├── cart/page.tsx
│   │       ├── checkout/page.tsx
│   │       └── orders/page.tsx
│   ├── api/                      # API routes
│   │   └── [route]/route.ts
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading UI
│   └── not-found.tsx             # 404 page
│
├── components/
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── features/                 # Feature-specific components
│   │   ├── auth/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   └── dashboard/
│   │       └── dashboard-stats.tsx
│   ├── layouts/                  # Layout components
│   │   ├── main-layout.tsx
│   │   └── dashboard-layout.tsx
│   ├── shared/                   # Shared UI components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   └── common/                   # Common utility components
│       ├── loading-spinner.tsx
│       ├── error-message.tsx
│       └── success-message.tsx
│
├── hooks/
│   ├── common/                   # Common reusable hooks
│   │   ├── use-debounce.ts
│   │   └── use-local-storage.ts
│   ├── use-auth.ts
│   └── use-media-query.ts
│
├── lib/
│   ├── api/
│   │   └── client.ts             # API client
│   ├── common/                   # Common library utilities
│   │   ├── api-helpers.ts
│   │   └── constants.ts
│   ├── errors/
│   │   └── api-error.ts          # Custom error classes
│   ├── validations/
│   │   └── auth.ts               # Zod schemas
│   └── utils.ts                  # Utility re-exports
│
├── services/
│   ├── common/                   # Common service utilities
│   │   ├── base-service.ts       # Base service class
│   │   └── api-config.ts         # API configuration
│   └── auth-service.ts           # Domain services
│
├── types/
│   ├── common/                   # Common types
│   │   └── index.ts              # BaseEntity, PaginationParams
│   ├── user.ts
│   └── api.ts
│
├── utils/
│   ├── common/                   # Common utilities
│   │   ├── class-names.ts        # cn() for Tailwind
│   │   ├── debounce.ts
│   │   └── throttle.ts
│   ├── format-date.ts
│   └── format-currency.ts
│
├── constants/
│   ├── common/                   # Common constants
│   │   └── messages.ts           # UI messages
│   ├── routes.ts                 # Route paths
│   └── env.ts                    # Environment variables
│
├── config/
│   └── common/
│       └── env.ts                # Validated env config
│
├── store/
│   └── auth-store.ts             # Zustand stores
│
├── middleware/
│   └── (if needed)
│
├── middleware.ts                 # Next.js middleware
│
├── tests/
│   ├── __mocks__/
│   ├── __tests__/
│   │   └── [mirror source structure]
│   └── setup/
│
├── public/                       # Static assets
│
└── styles/                       # Additional styles
```

## 📝 Naming Conventions - CRITICAL

### Files and Folders
- **ALWAYS use kebab-case**: `login-form.tsx`, `use-auth.ts`, `api-client.ts`
- **Exception**: Next.js special files must be exact names:
  - `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`
- **Exception**: Config files keep their standard names:
  - `package.json`, `tsconfig.json`, `next.config.ts`, `components.json`

### Components
- **File names**: kebab-case - `login-form.tsx`, `dashboard-stats.tsx`
- **Component names**: PascalCase - `LoginForm`, `DashboardStats`

### Functions, Variables, Hooks
- **camelCase**: `handleSubmit`, `userData`, `isLoading`, `useAuth`

### Constants
- **UPPER_SNAKE_CASE**: `API_BASE_URL`, `MAX_RETRY_ATTEMPTS`
- **PascalCase** for exported constant objects: `ROUTES`, `MESSAGES`

### Types and Interfaces
- **PascalCase**: `User`, `ApiResponse`, `LoginInput`

### Tests
- **kebab-case with `.test.ts` suffix**: `format-date.test.ts`, `login-form.test.tsx`

## 🔍 Where to Put Things

### New Component?
- **UI component (button, input, card)**: `components/ui/`
- **Feature-specific**: `components/features/[feature-name]/`
- **Shared across features**: `components/shared/`
- **Common utility component**: `components/common/`
- **Layout component**: `components/layouts/`

### New Hook?
- **Specific to a feature**: `hooks/use-[name].ts`
- **Common/reusable**: `hooks/common/use-[name].ts`

### New Utility Function?
- **Common utility (debounce, throttle, class-names)**: `utils/common/`
- **Domain-specific utility**: `utils/[domain]-[name].ts`

### New Service?
- **Extend BaseService**: `services/[domain]-service.ts`
- **Common service utilities**: `services/common/`

### New Type?
- **Common types (BaseEntity, etc.)**: `types/common/index.ts`
- **Domain-specific**: `types/[domain].ts`

### New Constant?
- **Common constants**: `constants/common/`
- **Domain-specific**: `constants/[domain].ts`

### New Validation Schema?
- **Domain-specific**: `lib/validations/[domain].ts`

## 🏗️ Common Patterns

### Creating a New Service

```typescript
// services/user-service.ts
import { BaseService } from "./common/base-service";

class UserService extends BaseService {
  async getUser(id: string) {
    return this.get(`/users/${id}`);
  }

  async updateUser(id: string, data: UpdateUserInput) {
    return this.patch(`/users/${id}`, data);
  }
}

export const userService = new UserService();
```

### Creating a Component with Common Utilities

```typescript
// components/features/auth/login-form.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { ErrorMessage } from "@/components/common/error-message";
import { useAuth } from "@/hooks/use-auth";
import { authService } from "@/services/auth-service";
import { cn } from "@/utils/common/class-names";
import type { LoginInput } from "@/lib/validations/auth";

export function LoginForm() {
  // Component implementation
}
```

### Creating a Custom Hook

```typescript
// hooks/common/use-window-size.ts
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Implementation
  }, []);

  return size;
}
```

### API Route Handler

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/errors/api-error";
import { HTTP_STATUS } from "@/lib/common/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Implementation
    return NextResponse.json(data, { status: HTTP_STATUS.OK });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
```

## 🔗 Import Paths (TypeScript Aliases)

All imports use `@/` prefix (configured in `tsconfig.json`):

- `@/components/*` → `components/*`
- `@/hooks/*` → `hooks/*`
- `@/lib/*` → `lib/*`
- `@/services/*` → `services/*`
- `@/types/*` → `types/*`
- `@/utils/*` → `utils/*`
- `@/constants/*` → `constants/*`
- `@/store/*` → `store/*`

**Always use absolute imports with `@/` prefix - never use relative imports like `../../`**

## 🧪 Testing Guidelines

### Test File Location
- Mirror source structure: `tests/__tests__/utils/format-date.test.ts` for `utils/format-date.ts`

### Test Naming
- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration: `*.integration.test.ts`
- E2E: `*.e2e.test.ts`

### Test Structure
```typescript
describe("functionName or ComponentName", () => {
  it("should do something specific", () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## ⚠️ Important Rules

1. **ALWAYS use kebab-case for files and folders** (except Next.js special files)
2. **ALWAYS use `@/` for imports** (no relative imports)
3. **ALWAYS use `common/` subfolder** for shared utilities/types/constants
4. **ALWAYS extend BaseService** for new services
5. **ALWAYS validate with Zod** for user inputs
6. **ALWAYS use TypeScript types** (no `any` types)
7. **ALWAYS handle errors** properly with custom error classes
8. **ALWAYS mirror test structure** to source structure
9. **ALWAYS use PascalCase** for component names
10. **ALWAYS use camelCase** for functions and variables

## 🎨 shadcn/ui Components

Minimal set installed:
- `button`, `card`, `input`, `label`, `textarea`
- `dialog`, `select`, `combobox`
- `alert-dialog`, `badge`, `dropdown-menu`
- `field`, `input-group`, `separator`
- `skeleton`

To add more: `npx shadcn@latest add [component-name] --yes`

## 📦 Dependencies

Key dependencies:
- `next`: 16.0.10
- `react`: 19.2.1
- `typescript`: 5.x
- `tailwindcss`: 4.x
- `zustand`: State management
- `zod`: Validation
- `shadcn/ui`: UI components

## 🚀 Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔄 When Adding New Features

1. **Create types** in `types/[domain].ts`
2. **Create validation schemas** in `lib/validations/[domain].ts`
3. **Create service** extending `BaseService` in `services/[domain]-service.ts`
4. **Create components** in `components/features/[domain]/`
5. **Create hooks** if needed in `hooks/` or `hooks/common/`
6. **Add constants** to `constants/` or `constants/common/`
7. **Add tests** mirroring source structure
8. **Update this document** if structure changes significantly

## 📚 Reference Files to Check

When in doubt, check these files for examples:
- `services/auth-service.ts` - Service pattern
- `lib/api/client.ts` - API client pattern
- `components/features/auth/login-form.tsx` - Component pattern
- `hooks/use-auth.ts` - Hook pattern
- `lib/validations/auth.ts` - Validation pattern
- `types/common/index.ts` - Common types pattern

---

**Last Updated**: Project initialization
**Maintained By**: Development Team

