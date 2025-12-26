# Sync Topics to Database Guide

This guide explains how to sync all DSA topics from code to the database.

## Overview

The codebase contains **39 DSA topics** organized into 8 modules:
- Module 1: Foundations (6 topics)
- Module 2: Core Data Structures (5 topics)
- Module 3: Searching & Sorting (7 topics)
- Module 4: Trees & Heaps (4 topics)
- Module 5: Graph Algorithms (4 topics)
- Module 6: Advanced Graphs (4 topics)
- Module 7: Algorithmic Paradigms (5 topics)
- Module 8: Advanced Techniques (3 topics)

## Quick Start

### 1. Ensure Database is Set Up

```bash
# Make sure DATABASE_URL is set in .env.local
# Then push schema to database
pnpm db:push
```

### 2. Sync Topics

```bash
# Sync all topics from code to database
pnpm db:sync-topics
```

This will:
- Read all topics from `/data/curriculum.ts`
- Map topic metadata to database format
- Upsert topics to the `topics` table
- Show summary of synced topics

## What Gets Synced

### Synced to Database (Metadata Only):
- ✅ Topic ID
- ✅ Title
- ✅ Description
- ✅ Category ID (defaults to "dsa")
- ✅ Module name
- ✅ Display order
- ✅ Difficulty level
- ✅ Enabled status

### Stays in Code (Not Synced):
- ❌ Content (MDX files)
- ❌ Quiz questions
- ❌ Practice problems
- ❌ Code examples
- ❌ YouTube links

## Topic Structure

Each topic in code has:
```typescript
{
  id: "bubble-sort",
  title: "Bubble Sort",
  description: "...",
  category: AlgorithmType.SORTING, // Legacy field
  categoryId: "dsa", // New extensible field
  module: "3. Searching & Sorting",
  order: 11,
  difficulty: "Easy",
  // ... other fields
}
```

## Verification

After syncing, verify in database:

```bash
# Open Drizzle Studio
pnpm db:studio
```

Check:
- `topics` table has all 39 topics
- All topics have `categoryId = "dsa"`
- Topics are ordered correctly by `order` field
- All topics are `enabled = true`

## Troubleshooting

### Error: "DATABASE_URL not set"
- Add `DATABASE_URL` to `.env.local`
- Run `pnpm db:push` first

### Error: "Invalid topic data"
- Check that all topics have `id` and `title`
- Verify `curriculum.ts` exports are correct

### Topics not appearing
- Check database connection
- Verify schema is up to date: `pnpm db:push`
- Check `topics` table exists

## Future Extensibility

The sync script is designed to handle:
- ✅ Multiple categories (DSA, Frontend, System Design, etc.)
- ✅ Topics without explicit `categoryId` (defaults to "dsa")
- ✅ Topics with missing optional fields (uses defaults)

To add new categories:
1. Add category to `types/category.ts`
2. Set `categoryId` in topic files
3. Run `pnpm db:sync-topics` again

## Script Output Example

```
🔄 Syncing topics from code to database...
==================================================
📝 Found 39 topics in code
📊 Categories: 1
📚 Modules: 8

📋 Topics by category:
   dsa: 39 topics

💾 Syncing to database...

==================================================
✅ Successfully synced 39 topics to database
✨ Done!

💡 Tip: Run 'pnpm db:studio' to view topics in the database
```

---

**Last Updated**: Topic sync setup
**Maintained By**: Development Team

