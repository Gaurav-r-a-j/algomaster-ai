# NeonDB Setup for Next.js - Best Practices

## Current Setup ✅

We're using **`@neondatabase/serverless`** which is the **recommended** library for NeonDB in Next.js.

### Why This Library?

1. **Serverless-Optimized**: Built specifically for serverless/edge environments
2. **HTTP Protocol**: Uses HTTP instead of WebSocket (faster in serverless)
3. **Connection Pooling**: Automatic connection management
4. **Next.js Compatible**: Works perfectly with Next.js App Router

## Connection Method

### HTTP Connection (Current - Recommended)
```typescript
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(DATABASE_URL)
const db = drizzle(sql, { schema })
```

**Benefits**:
- ✅ Fast in serverless environments
- ✅ No connection pooling needed
- ✅ Works with edge functions
- ✅ Automatic connection management

### Alternative: WebSocket (Not Recommended for Next.js)
```typescript
import { Pool } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-serverless"

const pool = new Pool({ connectionString: DATABASE_URL })
const db = drizzle(pool, { schema })
```

**Why Not**:
- ❌ Slower in serverless
- ❌ Connection pooling overhead
- ❌ Not ideal for edge functions

## Configuration

### Environment Variables
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### Neon Config
```typescript
import { neonConfig } from "@neondatabase/serverless"

// Enable connection caching (recommended for Next.js)
neonConfig.fetchConnectionCache = true
```

## Usage in Next.js

### API Routes
```typescript
// app/api/topics/route.ts
import { db } from "@/db"

export async function GET() {
  const topics = await db.select().from(topics)
  return Response.json(topics)
}
```

### Server Components
```typescript
// app/topics/page.tsx
import { db } from "@/db"
import { topics } from "@/db/schema"

export default async function TopicsPage() {
  const allTopics = await db.select().from(topics)
  return <div>...</div>
}
```

### Server Actions
```typescript
// app/actions.ts
"use server"
import { db } from "@/db"

export async function getTopics() {
  return await db.select().from(topics)
}
```

## Best Practices

### ✅ DO
- Use HTTP connection (`neon-http`)
- Enable connection caching
- Handle missing DATABASE_URL gracefully
- Use server components/actions for DB queries

### ❌ DON'T
- Don't use WebSocket in serverless
- Don't create connections in client components
- Don't expose DATABASE_URL to client
- Don't use connection pooling (HTTP handles it)

## Performance

### HTTP vs WebSocket in Next.js

| Feature | HTTP (Current) | WebSocket |
|---------|---------------|-----------|
| Serverless | ✅ Fast | ❌ Slower |
| Edge Functions | ✅ Works | ❌ Limited |
| Connection Overhead | ✅ Low | ❌ High |
| Next.js Compatibility | ✅ Perfect | ⚠️ Good |

## Current Implementation

Our setup is **optimal** for Next.js:
- ✅ Using `@neondatabase/serverless`
- ✅ Using `drizzle-orm/neon-http`
- ✅ Connection caching enabled
- ✅ Graceful fallback for client-side only mode

## Migration Notes

If you were using `Pool` before:
1. ✅ Already migrated to HTTP
2. ✅ Using `neon()` instead of `new Pool()`
3. ✅ Using `drizzle-orm/neon-http` instead of `neon-serverless`

**No changes needed** - we're already using the best approach! 🎉

## References

- [NeonDB Next.js Guide](https://neon.tech/docs/guides/nextjs)
- [Drizzle Neon HTTP](https://orm.drizzle.team/docs/get-started-postgresql#neon-serverless)
- [@neondatabase/serverless](https://github.com/neondatabase/serverless)

