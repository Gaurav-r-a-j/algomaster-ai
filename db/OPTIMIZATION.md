# Database Optimization

## What We Store (Essential Only)

### ✅ Users Table
- `id` - UUID primary key
- `email` - Unique identifier
- `name` - Display name (optional)
- `role` - User role (user/admin)
- `created_at` - Account creation time

**Removed to save space:**
- ❌ `password_hash` - Not needed if using external auth
- ❌ `avatar_url` - Can use external service (Gravatar)
- ❌ `email_verified` - Can add later if needed
- ❌ `updated_at` - Not critical for users

### ✅ User Progress Table
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `topic_id` - Topic identifier
- `status` - not_started, in_progress, completed
- `completed_at` - When topic was completed
- `last_accessed_at` - For "continue learning" feature

**Removed to save space:**
- ❌ `progress_percentage` - Can calculate from status
- ❌ `notes` - User notes (can use localStorage)
- ❌ `updated_at` - Use `last_accessed_at` instead

### ✅ Quiz Attempts Table
- `id` - UUID primary key
- `user_id` - Foreign key to users
- `topic_id` - Topic identifier
- `score` - Number of correct answers
- `total_questions` - Total questions in quiz
- `completed_at` - When quiz was completed

**Removed to save space:**
- ❌ `status` enum - Can calculate from score
- ❌ `answers` JSONB - Detailed answers (too large, not needed)
- ❌ `time_spent` - Not essential
- ❌ `created_at` - Use `completed_at` instead

**Optimization:** Only store best score per user/topic (upsert pattern)

## What We DON'T Store (Client-Side Only)

These stay in localStorage to save database space:

- **User Preferences** (theme, language) → localStorage
- **User Sessions** → Use JWT tokens (stateless)
- **Detailed Quiz Answers** → Only store score
- **User Notes** → localStorage
- **Code Playground State** → localStorage
- **Visualizer Settings** → localStorage

## Space Savings

### Before Optimization
- Users: ~200 bytes per user
- Progress: ~300 bytes per record
- Quiz Attempts: ~500 bytes per attempt (with answers)
- Preferences: ~150 bytes per user
- Sessions: ~200 bytes per session

**Total per active user:** ~1.5KB + (progress records × 300 bytes)

### After Optimization
- Users: ~100 bytes per user
- Progress: ~150 bytes per record
- Quiz Attempts: ~100 bytes per attempt (best score only)

**Total per active user:** ~350 bytes + (progress records × 150 bytes)

**Savings:** ~75% reduction in storage per user

## Indexes

We keep essential indexes for performance:
- `email_idx` on users.email (for login)
- `user_id_idx` on progress/quiz (for user queries)
- `topic_id_idx` on progress/quiz (for topic queries)
- `user_topic_idx` composite (for upsert operations)

## Best Practices

1. **Only store what's needed for cross-device sync**
   - Progress status → Yes (needs sync)
   - Theme preference → No (device-specific)

2. **Calculate instead of storing**
   - Progress percentage → Calculate from status
   - Completion rate → Calculate from completed count

3. **Upsert pattern for quiz scores**
   - Keep only best score per user/topic
   - Saves space and simplifies queries

4. **Use timestamps wisely**
   - `completed_at` → Only set when completed
   - `last_accessed_at` → Updated on every access

## Migration Notes

When migrating from old schema:
- User preferences → Move to localStorage
- Old quiz attempts → Keep only best scores
- Remove unused fields → Run migration script

