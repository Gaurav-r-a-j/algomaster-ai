# Authentication & Sessions Explanation

## What We Use

### ✅ Sessions Table (REQUIRED)
**Why**: NextAuth.js requires this to track logged-in users
**What it stores**:
- Session token (unique identifier)
- User ID (who is logged in)
- Expiration time

**Size**: ~150 bytes per active session
**Auto-cleanup**: NextAuth automatically deletes expired sessions

**Can we remove it?** ❌ No - NextAuth requires it for database sessions

### ✅ Accounts Table (REQUIRED)
**Why**: NextAuth requires this to link OAuth providers (GitHub, LinkedIn)
**What it stores**:
- Provider (github, linkedin)
- OAuth tokens
- Provider account ID

**Size**: ~300 bytes per account
**Can we remove it?** ❌ No - NextAuth requires it for OAuth

### ❌ Verification Tokens (REMOVED)
**Why removed**: Only using OAuth (GitHub, LinkedIn)
- No email verification needed (OAuth handles it)
- No password reset needed (no passwords!)
- NextAuth doesn't require this for OAuth-only

**Can we remove it?** ✅ Yes - Already removed!

## OAuth Providers

### Current
- ✅ **GitHub** (active) - For developers

### Future
- 🔜 **LinkedIn** (ready, not active) - For professionals

### To Add More
1. Add to `authProviderEnum` in schema (already includes "linkedin")
2. Add provider to NextAuth config
3. No database migration needed!

## How It Works

1. User clicks "Login with GitHub"
2. Redirected to GitHub OAuth
3. GitHub redirects back with code
4. NextAuth creates:
   - User record (if new)
   - Account record (GitHub OAuth)
   - Session record (logged in)
5. User is authenticated!

## Session Management

- Sessions expire automatically (NextAuth handles it)
- Old sessions are cleaned up
- No manual management needed

## Summary

**Required Tables**:
- ✅ `sessions` - Track logged-in users (NextAuth requirement)
- ✅ `accounts` - Link OAuth providers (NextAuth requirement)
- ✅ `users` - User profiles

**Removed**:
- ❌ `verification_tokens` - Not needed for OAuth-only

**Total**: Simple, clean, OAuth-focused!

