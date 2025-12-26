# Client-Side Only Mode

This application is designed to work **fully client-side without a backend**. All data persistence and state management is handled in the browser.

## Features

### ✅ Fully Client-Side
- **Progress Tracking**: Uses Zustand with localStorage persistence
- **Authentication**: Client-side only (demo mode) - stores user in localStorage
- **Data Storage**: All user data stored in browser localStorage
- **No Backend Required**: Works completely offline after initial load

### 📦 Data Persistence

#### Progress Tracking
- Stored in: `localStorage` (key: `dsa-progress-storage`)
- Managed by: Zustand with persist middleware
- Persists: Completed topics, quiz scores, learning progress

#### Authentication
- Stored in: `localStorage` (key: `auth_user`)
- Managed by: Zustand store (`useAuthStore`)
- Note: Currently in demo mode - accepts any credentials

### 🔧 Configuration

#### Environment Variables
- `NEXT_PUBLIC_API_URL`: Optional - if not set, app runs in client-side only mode
- If `NEXT_PUBLIC_API_URL` is set, the app will attempt to use that backend
- If not set or set to `/api`, the app uses mock data and localStorage

#### API Client
The API client (`lib/api/client.ts`) automatically:
- Detects if backend is available
- Falls back to mock data if no backend
- Handles errors gracefully

### 🚀 Adding Backend Later

When you're ready to add a backend:

1. Set `NEXT_PUBLIC_API_URL` environment variable
2. Update `services/auth-service.ts` to use real API calls
3. The API client will automatically switch to real API calls
4. Progress tracking can be synced to backend (optional)

### 📝 Current Limitations

- **Authentication**: Demo mode only (no real validation)
- **Data Sync**: No cross-device sync (localStorage is device-specific)
- **Code Execution**: Uses external APIs (Compiler Explorer, JDoodle) - these are free/public APIs

### 🎯 What Works Without Backend

✅ All learning content (topics, quizzes, visualizations)
✅ Progress tracking (localStorage)
✅ Code playground (uses external execution APIs)
✅ Visualizers (fully client-side)
✅ Navigation and routing
✅ Theme preferences
✅ User preferences

### 🔮 Future Backend Integration

When adding a backend, you can:
- Sync progress across devices
- Add real authentication
- Store user preferences server-side
- Add social features (sharing, comments)
- Analytics and usage tracking

---

**Note**: This is an open-source project designed to work standalone. Backend integration is optional and can be added later without breaking existing functionality.

