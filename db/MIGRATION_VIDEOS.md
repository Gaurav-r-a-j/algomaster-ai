# Topic Videos Migration Guide

## Overview

The `topic_videos` table stores YouTube video links for topics with multi-language support (English, Hindi, etc.).

## Schema

```sql
CREATE TABLE topic_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  language TEXT NOT NULL DEFAULT 'en',
  video_url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX topic_videos_topic_id_idx ON topic_videos(topic_id);
CREATE INDEX topic_videos_topic_language_idx ON topic_videos(topic_id, language);
```

## Migration Steps

1. **Push schema to database:**
   ```bash
   pnpm db:push
   ```

2. **Sync videos from code:**
   ```bash
   pnpm db:sync-topics
   ```
   This will automatically sync all `youtubeLink` fields from topic definitions to the database.

## Usage

### In Code (Topic Definitions)

Topics can define videos in two formats:

**Single video (English):**
```typescript
youtubeLink: "https://www.youtube.com/watch?v=example"
```

**Multi-language videos:**
```typescript
youtubeLink: {
  en: "https://www.youtube.com/watch?v=english",
  hi: "https://www.youtube.com/watch?v=hindi"
}
```

### In Application Code

```typescript
import { topicVideoService } from "@/db/services"

// Get all videos for a topic
const videos = await topicVideoService.getVideosByTopic("what-is-programming")

// Get video for specific language
const englishVideo = await topicVideoService.getVideoByTopicAndLanguage(
  "what-is-programming",
  "en"
)

// Upsert video
await topicVideoService.upsertVideo({
  topicId: "what-is-programming",
  language: "en",
  videoUrl: "https://www.youtube.com/watch?v=example"
})
```

## Notes

- **Unique Constraint**: One video per topic per language (enforced in application layer)
- **Language Codes**: Use ISO 639-1 codes (en, hi, es, etc.)
- **Default Language**: English ("en") is the default
- **Cascade Delete**: Videos are automatically deleted when a topic is deleted

