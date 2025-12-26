# Database Schema - Simple & Open Source Friendly

## Philosophy

**Content stays in CODE, not database!**

- ✅ Topics, quizzes, content → Stored in `/topics/**/*.mdx` files
- ✅ Database only tracks → User progress, quiz scores, accounts
- ✅ Why? Open source contribution - anyone can edit MDX files
- ✅ Why? No database migrations needed for content changes

## What's in Database

### Users
- Authentication (email, OAuth)
- Basic profile (name, GitHub username)
- WhatsApp (for community groups - managed externally)
- Referral tracking
- Engagement (streaks, sessions)

### User Progress
- Which topics user has completed
- Last accessed time
- Status (not_started, in_progress, completed)
- **Category-aware** (dsa, frontend, system-design, etc.)

### Quiz Attempts
- Best score per topic
- Score and total questions only
- **Category-aware** (dsa, frontend, system-design, etc.)

### Auth Tables (NextAuth)
- Accounts (OAuth providers)
- Sessions
- Verification tokens

## What's NOT in Database

❌ Topic content (MDX files in code)
❌ Quiz questions (in code)
❌ Code examples (in code)
❌ Practice problems (in code)
❌ Groups (use WhatsApp/Discord externally)

## Schema Design

### Simple & Extensible
- Category system for multiple topics (DSA, Frontend, System Design)
- Progress tracking per category
- Minimal data - only what's needed

### Open Source Friendly
- Content changes = code changes (PRs welcome!)
- No database migrations for content
- Easy to contribute

## Commands

```bash
# Generate migrations
pnpm db:generate

# Push schema to database
pnpm db:push

# Open database UI
pnpm db:studio
```

## Adding New Topics

1. Create topic in `/topics/{category}/{topic-name}/`
2. Add `index.ts` with topic metadata
3. Add `content.mdx` with content
4. Add `quiz.ts` with quiz questions
5. Import in `/data/curriculum.ts`
6. **No database changes needed!**

## Adding New Categories

1. Add to `CategoryType` enum in `/types/category.ts`
2. Add to `categoryIdEnum` in `/db/schema.ts`
3. Create topics in `/topics/{new-category}/`
4. Update routes to handle new category

## Syncing Topics to Database

After adding or updating topics in code, sync them to the database:

```bash
# Sync all topics from code to database
pnpm db:sync-topics
```

This script:
- Reads all topics from `/data/curriculum.ts`
- Maps topic metadata to database format
- Upserts topics to the `topics` table
- Shows summary of synced topics

**What gets synced:**
- Topic ID, title, description
- Category ID (defaults to "dsa")
- Module name, display order, difficulty
- Enabled status

**What stays in code:**
- Content (MDX files)
- Quiz questions
- Code examples
- Practice problems

## What We Store

### ✅ In Database (Synced Across Devices)
- **Users**: Authentication, profile (name, GitHub username), engagement tracking
- **User Progress**: Topic completion status, last accessed time
- **Quiz Attempts**: Best score per topic (for gamification)
- **Auth Tables**: OAuth accounts, sessions (NextAuth)

### ❌ NOT in Database (Client-Side Only)
- Topic content (MDX files in code)
- Quiz questions (in code)
- User preferences (localStorage)
- User notes (localStorage)
- Code playground state (localStorage)

**Why?** Content in code = easy open source contributions via PRs. No database migrations needed for content changes.
