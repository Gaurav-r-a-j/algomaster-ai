"use client"

import { 
  createHighlighter, 
  type Highlighter,
  type BundledLanguage,
  type BundledTheme 
} from "shiki"

// Singleton highlighter instance
let highlighterPromise: Promise<Highlighter> | null = null

// Languages we support
const SUPPORTED_LANGUAGES: BundledLanguage[] = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "json",
  "html",
  "css",
  "bash",
  "sql",
  "markdown",
]

// Theme
const DEFAULT_THEME: BundledTheme = "github-dark"

/**
 * Get or create the Shiki highlighter instance (client-side)
 */
export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [DEFAULT_THEME, "github-light"],
      langs: SUPPORTED_LANGUAGES,
    })
  }
  return highlighterPromise
}

/**
 * Highlight code with Shiki (client-side)
 */
export async function highlightCode(
  code: string,
  language: string = "text",
  theme: BundledTheme = DEFAULT_THEME
): Promise<string> {
  const hl = await getHighlighter()
  const lang = normalizeLanguage(language)

  // Check if language is supported
  if (!SUPPORTED_LANGUAGES.includes(lang as BundledLanguage)) {
    return escapeHtml(code)
  }

  try {
    return hl.codeToHtml(code, {
      lang: lang as BundledLanguage,
      theme,
    })
  } catch {
    return escapeHtml(code)
  }
}

/**
 * Normalize language aliases
 */
function normalizeLanguage(lang: string): string {
  const aliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    "c++": "cpp",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
  }
  return aliases[lang.toLowerCase()] || lang.toLowerCase()
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

// Language display config for UI
export const LANGUAGE_CONFIG: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "#f7df1e" },
  typescript: { label: "TypeScript", color: "#3178c6" },
  python: { label: "Python", color: "#3776ab" },
  java: { label: "Java", color: "#ed8b00" },
  cpp: { label: "C++", color: "#00599c" },
  c: { label: "C", color: "#555555" },
  go: { label: "Go", color: "#00add8" },
  rust: { label: "Rust", color: "#dea584" },
  json: { label: "JSON", color: "#292929" },
  html: { label: "HTML", color: "#e34f26" },
  css: { label: "CSS", color: "#1572b6" },
  bash: { label: "Bash", color: "#4eaa25" },
  sql: { label: "SQL", color: "#336791" },
  markdown: { label: "Markdown", color: "#083fa1" },
  text: { label: "Plain Text", color: "#888888" },
}
