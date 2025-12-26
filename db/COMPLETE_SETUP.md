# Complete Database Setup Guide

## ✅ What's Done

### Schema
- ✅ `users` - User profiles (GitHub OAuth)
- ✅ `accounts` - OAuth accounts (GitHub, LinkedIn)
- ✅ `sessions` - NextAuth sessions
- ✅ `topics` - Topic metadata (NEW!)
- ✅ `user_progress` - Learning progress
- ✅ `quiz_attempts` - Quiz scores

### Services
- ✅ `userService` - User management
- ✅ `topicService` - Topic management (NEW!)
- ✅ `progressService` - Progress tracking
- ✅ `quizService` - Quiz scores

### Scripts
- ✅ `sync-topics.ts` - Sync topics from code to database

## 🚀 Setup Steps

### 1. Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require

# GitHub OAuth
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

### 2. Generate & Push Schema

```bash
# Generate migration files
pnpm db:generate

# Push schema to database
pnpm db:push

# Verify in database UI
pnpm db:studio
```

### 3. Sync Topics from Code

```bash
# Sync all topics from code to database
pnpm db:sync-topics
```

This will:
- Read topics from `/data/curriculum.ts`
- Sync metadata to `topics` table
- Set order, category, difficulty, etc.

### 4. Verify Setup

```bash
# Check database
pnpm db:studio

# Should see:
# - topics table with all topics
# - users, accounts, sessions (empty until login)
# - user_progress, quiz_attempts (empty until users start learning)
```

## 📊 Database Structure

```
users
  ├── accounts (OAuth)
  ├── sessions (NextAuth)
  ├── user_progress → topics
  └── quiz_attempts → topics

topics
  ├── user_progress (many)
  └── quiz_attempts (many)
```

## 🔄 Workflow

### Adding New Topic

1. **Create in Code**:
   ```typescript
   // /topics/dsa/new-topic/index.ts
   export const newTopic: Topic = {
     id: "new-topic",
     title: "New Topic",
     categoryId: "dsa",
     // ...
   }
   ```

2. **Add to Curriculum**:
   ```typescript
   // /data/curriculum.ts
   export const TOPICS: Topic[] = [
     // ... existing topics
     newTopic,
   ]
   ```

3. **Sync to Database**:
   ```bash
   pnpm db:sync-topics
   ```

### Updating Topic Order/Visibility

```typescript
// In database (via service or direct)
await topicService.setTopicEnabled("topic-id", false) // Hide
await topicService.upsertTopic({ id: "topic-id", order: 5 }) // Reorder
```

## 🎯 Next Steps

1. ✅ Database schema ready
2. ✅ Services ready
3. ✅ Sync script ready
4. ⏭️ Update all topics to include `categoryId: "dsa"`
5. ⏭️ Run sync to populate database
6. ⏭️ Update UI to use topics from database
7. ⏭️ Test authentication flow

## 📝 Notes

- **Content**: Always in code (MDX files)
- **Metadata**: Synced from code to database
- **Order/Visibility**: Managed in database
- **Queries**: Fast (database) + Easy contributions (code)

