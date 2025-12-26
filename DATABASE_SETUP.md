# Database Setup Guide

## Quick Start

1. **Get NeonDB Connection String**
   - Sign up at [Neon Console](https://console.neon.tech)
   - Create a new project
   - Copy the connection string

2. **Add to Environment**
   ```bash
   # Add to .env file
   DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
   ```

3. **Generate and Push Schema**
   ```bash
   pnpm db:generate  # Generate migration files
   pnpm db:push      # Push schema to database
   ```

4. **Verify Setup**
   ```bash
   pnpm db:studio    # Open Drizzle Studio to view database
   ```

## Database Commands

All database commands are available via npm scripts:

```bash
# Generate migration files from schema changes
pnpm db:generate

# Push schema directly to database (development)
pnpm db:push

# Run migrations (production)
pnpm db:migrate

# Open Drizzle Studio (database GUI)
pnpm db:studio

# Check for schema changes
pnpm db:check

# Drop all tables (⚠️ destructive - use with caution)
pnpm db:drop
```

## Schema Overview

The database includes these tables:

- **users** - User accounts and authentication
- **user_progress** - Learning progress tracking per topic
- **quiz_attempts** - Quiz results and history
- **user_preferences** - User settings and preferences
- **user_sessions** - Authentication sessions (for future use)

## Using the Database in Code

### Option 1: Use Services (Recommended)

```typescript
import { userService, progressService } from "@/db/services"

// Get user
const user = await userService.getUserByEmail("user@example.com")

// Track progress
await progressService.markCompleted(userId, topicId)

// Get progress stats
const stats = await progressService.getProgressStats(userId)
```

### Option 2: Direct Queries

```typescript
import { db } from "@/db"
import { users, userProgress } from "@/db/schema"
import { eq } from "drizzle-orm"

// Direct query
const user = await db
  .select()
  .from(users)
  .where(eq(users.email, "user@example.com"))
  .limit(1)
```

## Migration Workflow

### Development

1. Make changes to `db/schema.ts`
2. Run `pnpm db:generate` to create migration files
3. Run `pnpm db:push` to apply changes

### Production

1. Make changes to `db/schema.ts`
2. Run `pnpm db:generate` to create migration files
3. Commit migration files to git
4. Deploy and run `pnpm db:migrate` on server

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string

Optional (for client-side fallback):
- If `DATABASE_URL` is not set, the app works in client-side only mode

## Security Best Practices

1. **Never commit `.env` file** - Use `.env.example` as template
2. **Use SSL connections** - NeonDB uses SSL by default
3. **Environment variables** - Store credentials in environment, not code
4. **Connection pooling** - Consider using connection pooling for production
5. **Backup regularly** - Set up automated backups in Neon console

## Troubleshooting

### Connection Issues

- Verify `DATABASE_URL` is correct
- Check SSL mode is set to `require`
- Ensure database is accessible from your network

### Migration Issues

- Check schema syntax in `db/schema.ts`
- Verify database connection
- Review migration files in `drizzle/` directory

### Type Errors

- Run `pnpm typecheck` to verify types
- Ensure Drizzle types are generated correctly
- Check imports are from correct paths

## Next Steps

- [ ] Set up database backups
- [ ] Add connection pooling for production
- [ ] Implement proper password hashing
- [ ] Add rate limiting for database queries
- [ ] Set up database monitoring

