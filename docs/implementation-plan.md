# DSA Platform Implementation Plan

## Overview
This document outlines the implementation plan for building the DSA learning platform based on the algomaster-ai reference, using Next.js 16, shadcn/ui components, and our established design system.

## Phase 1: Foundation & Data Structure

### 1.1 Types & Interfaces
- [ ] Create `types/curriculum.ts` with:
  - `Topic` interface
  - `AlgorithmType` enum
  - `VisualizerType` enum
  - `QuizQuestion` interface
  - `ChatMessage` interface
  - `VisualizationStep` interface
  - `SupportedLanguage` type

### 1.2 Curriculum Data Structure
- [ ] Create `data/curriculum.ts` - Main curriculum export
- [ ] Create `data/topics/` folder structure (no numbering in folder names):
  - `foundations/`
  - `core-data-structures/`
  - `searching-sorting/`
  - `trees-heaps/`
  - `graph-algorithms/`
  - `advanced-graphs/`
  - `algorithmic-paradigms/`
  - `advanced-techniques/`
  
  Note: Ordering is handled by the `order` field in the Topic interface, not folder names.
- [ ] Create sample topic files with markdown content

### 1.3 Progress Tracking
- [ ] Create `context/progress-context.tsx` - Zustand store for progress
- [ ] Create `hooks/use-progress.ts` - Progress hooks
- [ ] Create `hooks/use-progress-stats.ts` - Statistics calculations

## Phase 2: Core Pages & Layouts

### 2.1 Dashboard Page
- [ ] Create `app/(dashboard)/dashboard/page.tsx`
- [ ] Features:
  - Progress overview card with Progress component
  - Filter tabs (All, Easy, Medium, Hard, To Do, Completed)
  - Module-based topic cards
  - Topic completion badges
  - Navigation to topic detail pages

### 2.2 Topic Detail Page
- [ ] Create `app/(dashboard)/topics/[id]/page.tsx`
- [ ] Features:
  - Breadcrumb navigation
  - Tab navigation (Learn, Visualize, Practice)
  - Topic metadata (difficulty, complexity)
  - Previous/Next topic navigation

## Phase 3: Core Components

### 3.1 Learn View
- [ ] Create `components/features/learning/learn-view.tsx`
- [ ] Features:
  - Markdown content rendering
  - Quiz section
  - Complexity analysis sidebar
  - Concept tags

### 3.2 Visualize View
- [ ] Create `components/features/learning/visualize-view.tsx`
- [ ] Create `components/features/visualizers/` folder:
  - `sorting-visualizer.tsx`
  - `search-visualizer.tsx`
  - `data-structure-visualizer.tsx`
  - `pathfinding-visualizer.tsx`
  - `heap-visualizer.tsx`
  - `dp-visualizer.tsx`
  - `visualizer-layout.tsx` (common wrapper)

### 3.3 Practice View
- [ ] Create `components/features/learning/practice-view.tsx`
- [ ] Create `components/common/resizable-panels.tsx`
- [ ] Create `components/common/code-playground.tsx`
- [ ] Create `components/features/learning/instructions-panel.tsx`
- [ ] Features:
  - Resizable split view
  - Code editor with syntax highlighting
  - Language selector (Python, C++, Java, JavaScript)
  - Run code functionality
  - Instructions panel

### 3.4 Quiz Component
- [ ] Create `components/features/learning/quiz-section.tsx`
- [ ] Features:
  - Multiple choice questions
  - Answer selection
  - Results display
  - Completion tracking

## Phase 4: AI Features

### 4.1 AI Tutor
- [ ] Create `components/features/tutor/ai-tutor.tsx`
- [ ] Create `services/gemini-service.ts`
- [ ] Create `context/api-key-context.tsx`
- [ ] Features:
  - Floating chat button
  - Chat interface with messages
  - API key management
  - Context-aware responses
  - Markdown rendering in messages

### 4.2 Code Execution
- [ ] Integrate code execution in `code-playground.tsx`
- [ ] Use Gemini API for code execution
- [ ] Error handling and output display

## Phase 5: Required shadcn Components

### 5.1 Install Missing Components
```bash
npx shadcn@latest add progress
npx shadcn@latest add scroll-area
npx shadcn@latest add avatar
npx shadcn@latest add breadcrumb
npx shadcn@latest add skeleton
npx shadcn@latest add sheet (for mobile menu)
```

### 5.2 Verify Existing Components
- [x] Button
- [x] Badge
- [x] Card
- [x] Tabs
- [x] Accordion
- [x] Dialog
- [x] Input
- [x] Textarea
- [x] Label
- [x] Separator
- [x] Tooltip

## Phase 6: Reusable Components

### 6.1 Common Components
- [ ] `topic-card.tsx` - Reusable topic card component
- [ ] `progress-card.tsx` - Progress display card
- [ ] `complexity-badge.tsx` - Complexity display
- [ ] `difficulty-badge.tsx` - Difficulty indicator
- [ ] `topic-navigation.tsx` - Previous/Next navigation

### 6.2 Layout Components
- [ ] `dashboard-layout.tsx` - Dashboard-specific layout
- [ ] `topic-detail-layout.tsx` - Topic detail layout

## Phase 7: Utilities & Services

### 7.1 Algorithm Logic
- [ ] Create `utils/algorithm-logic.ts`:
  - `generateBubbleSortSteps()`
  - `generateSelectionSortSteps()`
  - `generateInsertionSortSteps()`
  - `generateMergeSortSteps()`
  - `generateQuickSortSteps()`
  - Other algorithm step generators

### 7.2 Markdown Processing
- [ ] Enhance `markdown-renderer.tsx` for code blocks
- [ ] Add syntax highlighting for code examples
- [ ] Support inline code and code blocks

## Phase 8: Styling & Polish

### 8.1 Design System Integration
- [ ] Ensure all components use design system colors
- [ ] Apply consistent spacing and typography
- [ ] Add animations and transitions
- [ ] Responsive design for mobile

### 8.2 Dark Mode
- [ ] Verify dark mode support across all components
- [ ] Test color contrast
- [ ] Ensure proper theme switching

## Phase 9: Testing & Optimization

### 9.1 Performance
- [ ] Optimize visualizer rendering
- [ ] Lazy load topic content
- [ ] Code splitting for large components

### 9.2 User Experience
- [ ] Add loading states
- [ ] Error boundaries
- [ ] Empty states
- [ ] Success feedback

## Implementation Order

1. **Week 1: Foundation**
   - Types and interfaces
   - Curriculum data structure
   - Progress tracking context

2. **Week 2: Core Pages**
   - Dashboard page
   - Topic detail page
   - Basic navigation

3. **Week 3: Learning Components**
   - Learn view
   - Quiz component
   - Markdown rendering

4. **Week 4: Visualization**
   - Visualizer components
   - Algorithm step generators
   - Interactive controls

5. **Week 5: Practice**
   - Code playground
   - Resizable panels
   - Code execution

6. **Week 6: AI Features**
   - AI Tutor component
   - Gemini service integration
   - API key management

7. **Week 7: Polish**
   - Styling and animations
   - Responsive design
   - Performance optimization

## File Structure

```
next-web-app/
├── app/
│   └── (dashboard)/
│       ├── dashboard/
│       │   └── page.tsx
│       └── topics/
│           └── [id]/
│               └── page.tsx
├── components/
│   ├── features/
│   │   ├── learning/
│   │   │   ├── learn-view.tsx
│   │   │   ├── visualize-view.tsx
│   │   │   ├── practice-view.tsx
│   │   │   ├── quiz-section.tsx
│   │   │   └── instructions-panel.tsx
│   │   ├── visualizers/
│   │   │   ├── sorting-visualizer.tsx
│   │   │   ├── search-visualizer.tsx
│   │   │   ├── data-structure-visualizer.tsx
│   │   │   └── visualizer-layout.tsx
│   │   └── tutor/
│   │       └── ai-tutor.tsx
│   └── common/
│       ├── resizable-panels.tsx
│       └── code-playground.tsx
├── context/
│   ├── progress-context.tsx
│   └── api-key-context.tsx
├── data/
│   ├── curriculum.ts
│   └── topics/
│       ├── foundations/
│       ├── core-data-structures/
│       ├── searching-sorting/
│       ├── trees-heaps/
│       ├── graph-algorithms/
│       ├── advanced-graphs/
│       ├── algorithmic-paradigms/
│       └── advanced-techniques/
├── hooks/
│   ├── use-progress.ts
│   └── use-progress-stats.ts
├── services/
│   └── gemini-service.ts
├── types/
│   └── curriculum.ts
└── utils/
    └── algorithm-logic.ts
```

## Notes

- All components should use shadcn/ui components where possible
- Follow the established design system and folder structure
- Use TypeScript strictly
- Implement proper error handling
- Add loading and empty states
- Ensure accessibility
- Test responsive design
- Optimize for performance

