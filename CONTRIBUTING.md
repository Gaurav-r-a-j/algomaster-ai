# Contributing to AlgoMaster AI

Thank you for your interest in contributing to AlgoMaster AI! This document provides guidelines and instructions for contributing to this open-source project.

## 🎯 How to Contribute

There are many ways to contribute:

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share your ideas for improvements
- 📝 **Improve documentation** - Make our docs better
- 🔧 **Fix bugs** - Submit pull requests for bug fixes
- ✨ **Add features** - Implement new functionality
- 🎨 **Improve UI/UX** - Enhance the user interface
- 📚 **Add topics** - Contribute new DSA topics or improve existing ones

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn
- Git

### Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/algomaster-ai.git
   cd algomaster-ai/next-web-app
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your configuration. See [.env.example](../.env.example) for detailed documentation of all available options.
   
   **Note**: The app works without any environment variables (client-side only mode), but you can add them for database and OAuth features.

5. **Run development server**
   ```bash
   pnpm dev
   ```

## 📋 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Your Changes

- Follow the [code style guidelines](#code-style)
- Write clear, descriptive commit messages
- Add tests if applicable
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run linter
pnpm lint

# Run type checker
pnpm typecheck

# Run all checks
pnpm check
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots if UI changes

## 📝 Code Style

### TypeScript

- Use TypeScript strict mode
- No `any` types (use proper types)
- Use interfaces for object shapes
- Use types for unions/intersections

### Naming Conventions

- **Files & Folders**: kebab-case (`login-form.tsx`, `use-auth.ts`)
- **Components**: PascalCase (`LoginForm`)
- **Functions/Variables**: camelCase (`handleSubmit`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`User`, `ApiResponse`)

### File Structure

- Use `@/` for absolute imports (no relative imports)
- Use `common/` subfolder for shared utilities
- Mirror test structure to source structure

### Example

```typescript
// ✅ Good
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import type { User } from "@/types/user"

export function LoginForm() {
  const { user, login } = useAuth()
  // ...
}

// ❌ Bad
import { Button } from "../../components/ui/button"
import { useAuth } from "../hooks/use-auth"
```

## 🧪 Testing

- Write tests for new features
- Update tests for bug fixes
- Ensure all tests pass before submitting PR

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## 📚 Adding New Topics

To add a new DSA topic:

1. **Create topic file** in `topics/{category}/{topic-name}/index.ts`
2. **Add content** in `topics/{category}/{topic-name}/content.mdx`
3. **Add quiz** in `topics/{category}/{topic-name}/quiz.ts`
4. **Update curriculum** in `data/curriculum.ts`
5. **Sync to database** (if using database):
   ```bash
   pnpm db:sync-topics
   ```

See existing topics for examples.

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment (OS, browser, Node version)

## 💡 Suggesting Features

When suggesting features:

- Clear description of the feature
- Use case and motivation
- Potential implementation approach (if you have ideas)
- Any alternatives considered

## 🔍 Code Review Process

1. All PRs require review before merging
2. Address review comments promptly
3. Keep PRs focused and reasonably sized
4. Update documentation as needed

## 📖 Documentation

- Update README.md for major changes
- Add/update docs in `docs/` folder
- Keep code comments clear and helpful
- Update type definitions

## 🎨 UI/UX Contributions

- Follow existing design patterns
- Use shadcn/ui components
- Ensure responsive design
- Test on multiple screen sizes
- Maintain accessibility standards

## 🔐 Security

- Never commit secrets or API keys
- Follow security best practices (see [SECURITY.md](./SECURITY.md))
- Report security issues privately

## ❓ Questions?

- Open an issue for questions
- Check existing documentation
- Review existing code for patterns

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AlgoMaster AI! 🎉

