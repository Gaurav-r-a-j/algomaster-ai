# How to Sync Topics from Code to Database

## Overview

Topics are defined in code (`/topics/**/index.ts`), but metadata is stored in database for fast queries and management.

## Initial Setup

### 1. Create Sync Script

Create a script to sync topics from code to database:

```typescript
// scripts/sync-topics.ts
import { topicService } from "@/db/services"
import { TOPICS } from "@/data/curriculum"

async function syncTopics() {
  const topicData = TOPICS.map(topic => ({
    id: topic.id,
    title: topic.title,
    description: topic.description,
    categoryId: topic.categoryId || "dsa", // Default to DSA
    module: topic.module,
    order: topic.order,
    difficulty: topic.difficulty || null,
  }))

  const synced = await topicService.syncTopicsFromCode(topicData)
  console.log(`✅ Synced ${synced} topics to database`)
}

syncTopics().catch(console.error)
```

### 2. Run Sync

```bash
# Add to package.json scripts
"db:sync-topics": "tsx scripts/sync-topics.ts"

# Run sync
pnpm db:sync-topics
```

## When to Sync

### Initial Setup
- Run once to populate database with all topics

### Adding New Topic
1. Create topic in code: `/topics/{category}/{topic}/index.ts`
2. Add to `TOPICS` array in `/data/curriculum.ts`
3. Run sync: `pnpm db:sync-topics`

### Updating Topic Metadata
- **In Code**: Edit `/topics/{category}/{topic}/index.ts`
- **Run Sync**: `pnpm db:sync-topics` (updates database)

### Updating Topic Order/Visibility
- **In Database**: Use `topicService.setTopicEnabled()` or update directly
- **No sync needed** - database is source of truth for order/visibility

## Workflow

```
Code (MDX) → Sync Script → Database (Metadata)
     ↑                           ↓
     └─────────── Load Content ──┘
```

1. **Content**: Always in code (MDX files)
2. **Metadata**: Synced from code to database
3. **Order/Visibility**: Managed in database
4. **Display**: Load metadata from DB, content from code

## Example

```typescript
// 1. Topic defined in code
export const bubbleSort: Topic = {
  id: "bubble-sort",
  title: "Bubble Sort",
  description: "...",
  categoryId: "dsa",
  module: "Module 3: Sorting",
  order: 0,
  difficulty: "Easy",
  // ... content, quiz, etc.
}

// 2. Sync to database
await topicService.syncTopicsFromCode([{
  id: "bubble-sort",
  title: "Bubble Sort",
  description: "...",
  categoryId: "dsa",
  module: "Module 3: Sorting",
  order: 0,
  difficulty: "Easy",
}])

// 3. Query from database
const topics = await topicService.getTopicsByCategory("dsa")
// Returns: [{ id: "bubble-sort", title: "Bubble Sort", ... }]

// 4. Load content from code
const topic = getTopicById("bubble-sort") // From curriculum.ts
const content = topic.content // From MDX file
```

## Benefits

- ✅ Fast sidebar queries (database)
- ✅ Easy content editing (code)
- ✅ Version controlled content
- ✅ Database manages visibility/order

