# Configuration Guide

This document explains all configuration options for AlgoMaster AI, including environment variables, app settings, and how they work together.

## 📋 Quick Reference

- **Environment Variables**: See [.env.example](../../.env.example) for all available options
- **App Configuration**: Defined in `config/app.ts`
- **Environment Schema**: Validated in `config/common/env.ts`

## 🔧 Configuration Files

### 1. Environment Variables (`.env.local`)

All environment variables are documented in [.env.example](../../.env.example). Copy it to `.env.local` and fill in your values.

**Quick Setup:**
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 2. App Configuration (`config/app.ts`)

Centralized application settings that use environment variables:

```typescript
export const APP_CONFIG = {
  name: "AlgoMaster AI",
  shortName: "AlgoMaster",
  description: "...",
  url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  // ... more settings
}
```

**What it controls:**
- App name and metadata
- SEO keywords
- Search engine verification
- Social media links

### 3. Environment Schema (`config/common/env.ts`)

Type-safe environment variable validation using Zod:

```typescript
const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  // ... more variables
})
```

**What it does:**
- Validates environment variables at startup
- Provides type safety
- Sets defaults where appropriate
- Ensures required formats (URLs, etc.)

## 📝 Configuration Options

### Database Configuration

**Variable**: `DATABASE_URL`

**Purpose**: PostgreSQL connection string for storing user progress, sessions, and quiz attempts.

**Format**: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`

**Required**: No - App works in client-side only mode without it

**Where to get it**: [Neon Console](https://console.neon.tech)

**Usage**: Used in `db/index.ts` for database connections

### Authentication (GitHub OAuth)

**Variables**:
- `GITHUB_CLIENT_ID` - GitHub OAuth App Client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth App Client Secret
- `NEXTAUTH_URL` - Base URL of your application
- `NEXTAUTH_SECRET` - Secret key for encrypting tokens

**Purpose**: Enable GitHub OAuth authentication

**Required**: No - App works without authentication

**Where to get it**: [GitHub Developer Settings](https://github.com/settings/developers)

**Usage**: Used in `lib/auth/config.ts` for NextAuth configuration

**Setup Steps**:
1. Create OAuth App on GitHub
2. Set callback URL: `https://yourdomain.com/api/auth/callback/github`
3. Copy Client ID and Secret to `.env.local`

### Application URLs

**Variables**:
- `NEXT_PUBLIC_APP_URL` - Base URL of your application
- `NEXT_PUBLIC_API_URL` - API base URL (optional)

**Purpose**: Configure application URLs for different environments

**Defaults**:
- `NEXT_PUBLIC_APP_URL`: `http://localhost:3000` (development)
- `NEXT_PUBLIC_API_URL`: `/api` (relative, client-side only mode)

**Usage**: 
- Used in `config/app.ts` for app metadata
- Used in `lib/api/client.ts` for API calls

### Analytics (PostHog)

**Variables**:
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog API host

**Purpose**: Enable analytics tracking

**Required**: No

**Where to get it**: [PostHog Dashboard](https://posthog.com)

**Usage**: Used in `components/providers/posthog-provider.tsx`

**Default**: `https://us.i.posthog.com`

### Search Engine Verification

**Variables**:
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console
- `NEXT_PUBLIC_YANDEX_VERIFICATION` - Yandex Webmaster
- `NEXT_PUBLIC_BING_VERIFICATION` - Bing Webmaster

**Purpose**: Verify site ownership for search engines

**Required**: No

**Usage**: Used in `config/app.ts` for meta tags

### Node Environment

**Variable**: `NODE_ENV`

**Purpose**: Set the environment mode

**Options**: `development`, `production`, `test`

**Default**: `development`

**Usage**: Controls behavior in various parts of the app (debugging, error handling, etc.)

## 🎯 Configuration Modes

### Client-Side Only Mode (Default)

**No environment variables needed!**

The app works out of the box using:
- localStorage for progress tracking
- Client-side state management
- No backend required

**When to use**: 
- Quick start / development
- Testing the app
- No need for user accounts or database

### With Database Mode

**Add**: `DATABASE_URL`

Enables:
- Persistent progress tracking across devices
- User accounts and sessions
- Quiz score history

**When to use**:
- Production deployment
- Multi-device support needed
- User account features needed

### With Authentication Mode

**Add**: GitHub OAuth credentials + NextAuth config

Enables:
- User login with GitHub
- Secure sessions
- User profiles

**When to use**:
- Production deployment
- User accounts needed
- Multi-user support

### Full Production Mode

**All optional variables configured**

Includes:
- Database for persistence
- OAuth for authentication
- Analytics for insights
- Search engine verification for SEO

## 🔍 How Configuration Works

### 1. Environment Variables Load

Next.js automatically loads `.env.local` file (if it exists)

### 2. Schema Validation

`config/common/env.ts` validates all variables using Zod:
- Checks formats (URLs, enums, etc.)
- Sets defaults
- Provides type safety

### 3. App Configuration

`config/app.ts` uses validated env variables to create `APP_CONFIG`

### 4. Usage Throughout App

Components and services import from:
- `config/common/env` - For environment variables
- `config/app` - For app settings

## 🛠️ Development vs Production

### Development

```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

### Production

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
DATABASE_URL=postgresql://...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
NEXTAUTH_SECRET=...
```

## 🔐 Security Notes

- **Never commit** `.env.local` files
- **Never put secrets** in `NEXT_PUBLIC_*` variables (they're exposed to browser)
- **Use strong secrets** for `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- See [SECURITY.md](../../SECURITY.md) for more details

## 📚 Related Documentation

- [.env.example](../../.env.example) - Complete environment variable reference
- [Setup Guide](./setup.md) - Initial setup instructions
- [Security Guidelines](../../SECURITY.md) - Security best practices
- [Database Setup](../../DATABASE_SETUP.md) - Database configuration details

## ❓ Troubleshooting

### Variables Not Loading

- Check file is named `.env.local` (not `.env`)
- Restart development server after changes
- Check for typos in variable names

### Validation Errors

- Check variable formats (URLs must be valid, etc.)
- See `config/common/env.ts` for expected formats
- Check console for specific error messages

### Configuration Not Working

- Verify variables are in `.env.local` (not committed to git)
- Check variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_*` prefix for client-side variables

---

**Last Updated**: Configuration documentation
**See Also**: [.env.example](../../.env.example) for all available options

