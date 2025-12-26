# Topics Table - Metadata Management

## Purpose

The `topics` table stores **metadata only** - content stays in code (MDX files).

### What's in Database
- Topic ID, title, description
- Category, module, order
- Difficulty, enabled status
- Timestamps

### What's in Code (MDX files)
- Full content (markdown)
- Quiz questions
- Code examples
- Practice problems

## Why This Design?

### Benefits
- ✅ Easy contributions (edit MDX files)
- ✅ Version controlled content
- ✅ No database migrations for content
- ✅ Database manages visibility/order
- ✅ Fast queries for sidebar/navigation

### Workflow
1. Add topic in code: `/topics/{category}/{topic}/index.ts` + `content.mdx`
2. Sync metadata to database: `topicService.syncTopicsFromCode()`
3. Database manages: order, visibility, categories
4. Content loads from: MDX files in code

## Schema

```typescript
topics {
  id: string (primary key)        // "bubble-sort", "react-hooks"
  categoryId: enum               // "dsa", "frontend", "system-design"
  title: string                  // "Bubble Sort"
  description: string             // Short description
  module: string                  // "Module 3: Sorting"
  order: integer                  // Display order
  difficulty: string              // "Easy", "Medium", "Hard"
  enabled: boolean                // Show/hide
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Usage

### Get Topics for Sidebar
```typescript
// Get all topics grouped by category
const topicsByCategory = await topicService.getTopicsGroupedByCategory()
// Returns: { "dsa": [...], "frontend": [...] }
```

### Get Topics for Category
```typescript
// Get DSA topics in order
const dsaTopics = await topicService.getTopicsByCategory("dsa")
```

### Sync from Code
```typescript
// Sync topic metadata from curriculum.ts
await topicService.syncTopicsFromCode([
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "...",
    categoryId: "dsa",
    module: "Module 3: Sorting",
    order: 0,
    difficulty: "Easy"
  },
  // ...
])
```

## Relations

- `user_progress.topicId` → `topics.id`
- `quiz_attempts.topicId` → `topics.id`

## Migration Strategy

1. **Initial Setup**: Run sync to populate topics from code
2. **Add New Topic**: 
   - Add to code (MDX files)
   - Run sync again
3. **Update Metadata**: Update database directly (order, enabled, etc.)
4. **Update Content**: Edit MDX files (no database change)

## Summary

- **Database**: Manages metadata, order, visibility
- **Code**: Stores content, quizzes, examples
- **Best of both**: Fast queries + easy contributions!

