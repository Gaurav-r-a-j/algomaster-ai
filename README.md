# AlgoMaster AI

<div align="center">

**An open-source, interactive Data Structures and Algorithms learning platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing) • [License](#-license)

</div>

An interactive Data Structures and Algorithms learning platform built with Next.js 16, featuring algorithm visualizers, comprehensive curriculum, and AI-powered tutoring. Perfect for students, developers, and anyone preparing for technical interviews.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed folder structure documentation.

See [AI_REFERENCE.md](./AI_REFERENCE.md) for AI assistant guidelines and conventions.

See [docs/](./docs/) for platform documentation.

## 📚 Documentation

All platform documentation is organized in the `docs/` folder:

- `docs/platform/` - Platform overview, features, and architecture
- `docs/development/` - Development setup and guidelines
- `docs/api/` - API documentation
- `docs/user-guide/` - User-facing documentation

## 🎨 Design System

Visit `/design-system` to see all UI components, icons, and design patterns in action.

## ✨ Features

- 🎯 **39+ DSA Topics** - Comprehensive curriculum covering all essential algorithms and data structures
- 🎨 **Interactive Visualizations** - Watch algorithms come to life with step-by-step visualizations
- 🤖 **AI-Powered Tutor** - Get instant explanations and guidance (requires your own API key)
- 📝 **Practice Problems** - Curated problems from easy to hard with detailed solutions
- 📊 **Progress Tracking** - Track your learning progress across all topics
- 🎓 **Quiz System** - Test your knowledge with interactive quizzes
- 🌙 **Dark Mode** - Beautiful UI with dark mode support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **GitHub OAuth** - Secure authentication with GitHub
- 🚀 **Production Ready** - Built with modern best practices and TypeScript

## 📦 Tech Stack

- **Framework**: Next.js 16.0.10
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Validation**: Zod
- **Testing**: Jest, React Testing Library

## 📝 Naming Conventions

- **Files & Folders**: kebab-case (`login-form.tsx`, `use-auth.ts`)
- **Components**: PascalCase (`LoginForm`)
- **Functions/Variables**: camelCase (`handleSubmit`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`User`, `ApiResponse`)

## 🔧 Environment Variables

### Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your values** in `.env.local`

3. **See [.env.example](./.env.example)** for all available options with detailed comments

### Minimal Setup (Client-Side Only)

The app works without any environment variables! It will run in client-side only mode using localStorage.

### Full Setup (With Database & OAuth)

See `.env.example` for complete configuration including:
- Database connection (PostgreSQL/Neon)
- GitHub OAuth authentication
- Analytics (PostHog)
- Search engine verification

**Note**: Never commit `.env.local` files. See [SECURITY.md](./SECURITY.md) for security best practices.

## 📚 Documentation

### For Users
- [Getting Started Guide](./docs/development/setup.md) - Complete setup instructions
- [Configuration Guide](./docs/development/configuration.md) - All configuration options explained
- [Database Setup](./DATABASE_SETUP.md) - Database configuration guide
- [Client-Side Mode](./CLIENT_SIDE_ONLY.md) - Run without a backend

### For Developers
- [Project Structure](./docs/project/PROJECT_STRUCTURE.md) - Complete project structure guide
- [AI Reference](./docs/project/AI_REFERENCE.md) - AI assistant guidelines
- [Contributing Guide](./CONTRIBUTING.md) - How to contribute to this project
- [Security Guidelines](./SECURITY.md) - Security best practices

### Platform Documentation
All platform documentation is in the [`docs/`](./docs/) folder:
- `docs/platform/` - Platform overview, features, and architecture
- `docs/development/` - Development setup and guidelines
- `docs/components/` - Component documentation

## 🧪 Testing

Test files follow the same structure as source files and use `.test.ts` or `.test.tsx` suffix.

```bash
# Run tests (when configured)
pnpm test
```

## 🎯 Common Folders Pattern

Many directories use a `common/` subfolder for shared utilities:

- `lib/common/` - Common library utilities
- `services/common/` - Common service patterns
- `types/common/` - Common type definitions
- `utils/common/` - Common utility functions
- `hooks/common/` - Common hooks
- `components/common/` - Common components
- `constants/common/` - Common constants
- `config/common/` - Common configuration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [HugeIcons](https://hugeicons.com/) and [Heroicons](https://heroicons.com/)

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Zod Documentation](https://zod.dev)

---

<div align="center">

Made with ❤️ by the AlgoMaster AI team

[Report Bug](https://github.com/yourusername/algomaster-ai/issues) • [Request Feature](https://github.com/yourusername/algomaster-ai/issues) • [Documentation](./docs/)

</div>
