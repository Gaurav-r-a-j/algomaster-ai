# Database Schema Explanation

## What We Store & Why

### Required Tables

#### 1. **users** - User Profiles
**Why**: Basic user information
**Size**: ~200 bytes per user
**Fields**:
- Email, name (from OAuth)
- GitHub username (for contributions)
- Referral tracking (for growth)
- Engagement (streaks, sessions)

#### 2. **accounts** - OAuth Accounts
**Why**: NextAuth requires this to link OAuth providers
**Size**: ~300 bytes per account
**Fields**:
- Provider (github, linkedin)
- OAuth tokens
- Provider account ID

#### 3. **sessions** - User Sessions
**Why**: NextAuth requires this to track logged-in users
**Size**: ~150 bytes per active session
**Fields**:
- Session token
- User ID
- Expiration

**Note**: Sessions are automatically cleaned up by NextAuth when expired.

### Progress & Quiz Tables

#### 4. **user_progress** - Learning Progress
**Why**: Track which topics user has completed
**Size**: ~150 bytes per topic per user
**Fields**:
- Status (not_started, in_progress, completed)
- Last accessed time
- Completion timestamp

**Example**: User with 50 topics = ~7.5 KB

#### 5. **quiz_attempts** - Quiz Scores
**Why**: Store best quiz score per topic
**Size**: ~100 bytes per topic per user
**Fields**:
- Best score (0-100)
- Completion timestamp

**Example**: User with 50 topics = ~5 KB

**Total per active user**: ~12.5 KB (very efficient!)

## What We DON'T Store

### ❌ Verification Tokens
**Why removed**: Only using OAuth (GitHub, LinkedIn)
- No email verification needed
- No password reset needed
- OAuth handles authentication

### ❌ Groups
**Why removed**: Use WhatsApp/Discord externally
- Simpler database
- Community manages themselves
- No database overhead

### ❌ Content
**Why not stored**: Content in code (MDX files)
- Easy to contribute
- Version controlled
- No database migrations for content

## Space Analysis

### Per User Estimate
- User record: ~200 bytes
- Account (GitHub): ~300 bytes
- Progress (50 topics): ~7,500 bytes
- Quiz scores (50 topics): ~5,000 bytes
- **Total: ~13 KB per active user**

### For 10,000 Users
- Total: ~130 MB (very manageable!)

## Quiz Attempts - Do We Need It?

### Current: Keep It ✅
**Space**: ~100 bytes per topic per user
- 50 topics = 5 KB per user
- 10,000 users = 50 MB total

**Benefits**:
- Track best scores per topic
- Gamification (leaderboards, achievements)
- Progress analytics
- User engagement metrics

### Alternative: Remove It
**If you want to save space**:
1. Delete `quizAttempts` table
2. Update `quiz-service.ts` to return null/empty
3. Calculate completion from `user_progress.status === "completed"`

**Trade-off**:
- ✅ Save 5 KB per user
- ❌ Lose quiz score tracking
- ❌ Lose gamification data

### Recommendation
**Keep it** - Only 5 KB per user is minimal, provides valuable gamification and analytics data. But it's optional - you can remove if space is critical.

## Future OAuth Providers

Currently supports:
- ✅ GitHub (active)
- ✅ LinkedIn (ready, not active)

To add more:
1. Add to `authProviderEnum` in schema
2. Add provider to NextAuth config
3. No database migration needed (enum already includes it)

## Summary

**Required**:
- ✅ users (basic profile)
- ✅ accounts (OAuth)
- ✅ sessions (NextAuth)

**Optional but Recommended**:
- ✅ user_progress (track learning)
- ✅ quiz_attempts (track scores)

**Removed**:
- ❌ verification_tokens (OAuth only)
- ❌ groups (external management)

**Total**: Simple, efficient, extensible!

