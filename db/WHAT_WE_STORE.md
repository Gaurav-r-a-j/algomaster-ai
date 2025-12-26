# What We Store in Database

## Summary

We keep **only essential data** that needs to sync across devices. Everything else stays in localStorage to save space.

## ✅ Stored in Database

### 1. Users (Essential)
- `id` - User identifier
- `email` - Login identifier
- `name` - Display name
- `role` - User/admin
- `created_at` - Account creation

**Why:** Needed for authentication and user identification across devices.

### 2. User Progress (Essential)
- `user_id` + `topic_id` - Which user, which topic
- `status` - not_started, in_progress, completed
- `completed_at` - When completed
- `last_accessed_at` - For "continue learning"

**Why:** Core feature - users need progress synced across devices.

### 3. Quiz Scores (Essential - Best Only)
- `user_id` + `topic_id` - Which user, which topic
- `score` - Correct answers count
- `total_questions` - Total questions
- `completed_at` - When completed

**Why:** Track learning progress. We only keep **best score** per user/topic to save space.

## ❌ NOT Stored (Client-Side Only)

### User Preferences
- Theme (light/dark) → localStorage
- Language → localStorage
- Notification settings → localStorage

**Why:** Device-specific preferences don't need sync.

### User Sessions
- Not stored → Use stateless JWT tokens

**Why:** Stateless auth is more efficient.

### Detailed Quiz Data
- Individual answers → Not stored
- Time spent → Not stored
- Multiple attempts → Only best score kept

**Why:** Saves significant space. Score is enough for progress tracking.

### User Notes
- Topic notes → localStorage

**Why:** Personal notes are device-specific.

### Code Playground State
- Editor content → localStorage
- Settings → localStorage

**Why:** Temporary data, doesn't need sync.

## Space Efficiency

### Per User Storage Estimate

**Database:**
- User record: ~100 bytes
- Progress per topic: ~150 bytes
- Quiz score per topic: ~100 bytes

**Example:** User with 50 topics
- User: 100 bytes
- Progress: 50 × 150 = 7,500 bytes
- Quiz scores: 50 × 100 = 5,000 bytes
- **Total: ~12.6 KB per user**

**localStorage (per device):**
- Preferences: ~500 bytes
- Notes: ~2-5 KB (varies)
- Code playground: ~10-50 KB (varies)

## What Gets Synced

✅ **Synced across devices:**
- Progress status
- Completed topics
- Quiz scores
- User account info

❌ **NOT synced (device-specific):**
- Theme preference
- Editor content
- User notes
- Temporary UI state

## Migration Strategy

When adding database:
1. Migrate progress from localStorage → Database
2. Keep preferences in localStorage (no migration needed)
3. Migrate quiz scores (keep only best per topic)

## Future Considerations

If you need to add later:
- **User preferences sync** → Add `user_preferences` table (optional)
- **Detailed quiz history** → Add `quiz_attempts_history` table (optional)
- **User notes sync** → Add `user_notes` table (optional)

But for now, keep it minimal! 🎯

