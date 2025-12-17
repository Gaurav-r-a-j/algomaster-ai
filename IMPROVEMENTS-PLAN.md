# DSA Platform Improvements Plan

## ✅ Completed Fixes

### 1. Heading Sizes - FIXED
- Reduced h1 from `text-2xl md:text-3xl` to `text-xl md:text-2xl`
- Reduced h2 from `text-xl md:text-2xl` to `text-lg md:text-xl`
- Reduced h3 from `text-lg md:text-xl` to `text-base md:text-lg`
- Reduced h4 from `text-base md:text-lg` to `text-sm md:text-base`
- Updated in both `mdx-components.tsx` and `markdown-renderer.tsx`

### 2. Double Borders - FIXED
- Reduced HR spacing from `my-8` to `my-6`
- Improved code block border styling

## 🔄 In Progress

### 3. Knowledge Check Questions
- Created example: `queue.quiz.ts`
- Need to create quiz files for all topics
- Pattern: `{topic-name}.quiz.ts` in same folder as `.mdx` file

### 4. Code Block Rendering
- Multi-language format (`\`\`\`multi`) is working
- Need to verify all content files use this format (most are done)

### 5. Right Sidebar
- Currently shows "Quick Info" (complexity + navigation)
- Options:
  - Remove it (simpler)
  - Convert to Table of Contents (more useful)
  - Keep but improve styling

## 📋 Pending Tasks

### 6. Visualizations
- Need to improve with d3/react-flow
- Flowcharts not rendering properly
- Visual representations need better libraries

### 7. Folder Structure Reorganization
Current:
```
data/content/
  ├── markdown/
  ├── code/
  └── visualizations/
```

Proposed (Topic-based):
```
data/content/
  ├── core-data-structures/
  │   ├── queue/
  │   │   ├── content.mdx
  │   │   ├── quiz.ts
  │   │   ├── visualizer.tsx
  │   │   └── code-examples.ts
  │   └── stack/
  │       └── ...
```

### 8. Flowchart Rendering
- Need proper flowchart library (react-flowchart, mermaid, etc.)
- Currently ASCII art, should be interactive

### 9. AI Mode for Knowledge Check
- Add AI-generated questions on the fly
- Use Gemini API to generate contextual questions

## 🎯 Priority Order

1. ✅ Fix heading sizes (DONE)
2. ✅ Fix double borders (DONE)
3. 🔄 Add knowledge check questions for all topics
4. 🔄 Improve/remove right sidebar
5. 📋 Fix visualizations with proper libraries
6. 📋 Fix flowchart rendering
7. 📋 Reorganize folder structure
8. 📋 Add AI mode for knowledge check

