"use client"

import * as React from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import python from "highlight.js/lib/languages/python"
import java from "highlight.js/lib/languages/java"
import cpp from "highlight.js/lib/languages/cpp"
import typescript from "highlight.js/lib/languages/typescript"
import go from "highlight.js/lib/languages/go"
import { ArrowDown01Icon } from "@/lib/icons"

import "highlight.js/styles/github-dark.css"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CopyButton } from "./copy-button"

// Register languages
hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("js", javascript)
hljs.registerLanguage("python", python)
hljs.registerLanguage("py", python)
hljs.registerLanguage("java", java)
hljs.registerLanguage("cpp", cpp)
hljs.registerLanguage("c++", cpp)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("ts", typescript)
hljs.registerLanguage("go", go)

// Language config with colors
const LANGUAGES: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "#f7df1e" },
  js: { label: "JavaScript", color: "#f7df1e" },
  python: { label: "Python", color: "#3776ab" },
  py: { label: "Python", color: "#3776ab" },
  java: { label: "Java", color: "#ed8b00" },
  cpp: { label: "C++", color: "#00599c" },
  "c++": { label: "C++", color: "#00599c" },
  typescript: { label: "TypeScript", color: "#3178c6" },
  ts: { label: "TypeScript", color: "#3178c6" },
  go: { label: "Go", color: "#00add8" },
}

interface CodeBlockProps {
  code: Record<string, string>
  defaultLanguage?: string
  className?: string
}

export function CodeBlock({ 
  code, 
  defaultLanguage = "javascript",
  className 
}: CodeBlockProps) {
  // Only allow valid programming languages, filter out invalid keys like "left", "right", etc.
  const VALID_LANGUAGES = new Set([
    "javascript", "js", "python", "py", "java", "cpp", "c++", 
    "typescript", "ts", "go", "c", "cs", "csharp", "rust", 
    "rb", "ruby", "php", "swift", "kotlin", "sql", "bash", 
    "sh", "shell", "json", "yaml", "yml", "html", "css", "scss"
  ])
  
  const availableLanguages = Object.keys(code)
    .filter(lang => code[lang] && VALID_LANGUAGES.has(lang.toLowerCase()))
  
  // Compute initial language
  const getInitialLanguage = () => {
    if (availableLanguages.includes(defaultLanguage)) {
      return defaultLanguage
    }
    if (defaultLanguage === "javascript" && availableLanguages.includes("js")) {
      return "js"
    }
    if (defaultLanguage === "python" && availableLanguages.includes("py")) {
      return "py"
    }
    return availableLanguages[0] || "javascript"
  }
  
  const [activeLanguage, setActiveLanguage] = React.useState(getInitialLanguage)
  
  const activeCode = code[activeLanguage] || ""
  
  // Highlight code
  const highlightedCode = React.useMemo(() => {
    try {
      const langKey = activeLanguage === "c++" ? "cpp" : activeLanguage
      const result = hljs.highlight(activeCode, { language: langKey })
      return result.value
    } catch {
      return activeCode
    }
  }, [activeCode, activeLanguage])

  const activeLangConfig = LANGUAGES[activeLanguage] || { label: activeLanguage, color: "#888" }

  return (
    <div className={cn(
      "group/code relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5">
        {/* Left: Mac dots + Language selector */}
        <div className="flex items-center gap-4">
          {/* Mac traffic lights */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_2px_#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_2px_#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27ca40] shadow-[0_0_2px_#27ca40]" />
          </div>
          
          {/* Language Dropdown */}
          {availableLanguages.length > 1 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-7 gap-2 rounded-lg bg-white/5 px-3 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <span 
                    className="h-2 w-2 rounded-full" 
                    style={{ backgroundColor: activeLangConfig.color }}
                  />
                  {activeLangConfig.label}
                  <ArrowDown01Icon size={12} className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                sideOffset={8}
                className="z-50 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-[#1c2128] p-1.5 shadow-2xl"
              >
                {availableLanguages.map((lang) => {
                  const config = LANGUAGES[lang] || { label: lang, color: "#888" }
                  const isActive = activeLanguage === lang
                  return (
                    <DropdownMenuItem
                      key={lang}
                      onClick={() => setActiveLanguage(lang)}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-colors",
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span 
                        className="h-2.5 w-2.5 rounded-full ring-2 ring-white/10" 
                        style={{ backgroundColor: config.color }}
                      />
                      {config.label}
                      {isActive && (
                        <span className="ml-auto text-xs text-emerald-400">✓</span>
                      )}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
              <span 
                className="h-2 w-2 rounded-full" 
                style={{ backgroundColor: activeLangConfig.color }}
              />
              {activeLangConfig.label}
            </div>
          )}
        </div>

        {/* Right: Copy button */}
        <CopyButton
          value={activeCode}
          className="h-8 w-8 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
        />
      </div>

      {/* Code area */}
      <div className="relative overflow-x-auto">
        <pre className="m-0 p-5 font-mono text-[13px] leading-relaxed text-[#e6edf3]">
          <code 
            className={`hljs language-${activeLanguage}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  )
}

// Simple single-language code block
interface SimpleCodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function SimpleCodeBlock({ 
  code, 
  language = "javascript",
  className 
}: SimpleCodeBlockProps) {
  const highlightedCode = React.useMemo(() => {
    try {
      const langKey = language === "c++" ? "cpp" : language
      const result = hljs.highlight(code, { language: langKey })
      return result.value
    } catch {
      return code
    }
  }, [code, language])

  const langConfig = LANGUAGES[language] || { label: language, color: "#888" }

  return (
    <div className={cn(
      "group/code relative my-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between bg-[#161b22] px-4 py-2.5">
        <div className="flex items-center gap-4">
          {/* Mac traffic lights */}
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_2px_#ff5f56]" />
            <div className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_2px_#ffbd2e]" />
            <div className="h-3 w-3 rounded-full bg-[#27ca40] shadow-[0_0_2px_#27ca40]" />
          </div>
          
          {/* Language badge */}
          <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70">
            <span 
              className="h-2 w-2 rounded-full" 
              style={{ backgroundColor: langConfig.color }}
            />
            {langConfig.label}
          </div>
        </div>
        
        {/* Floating copy button - appears on hover */}
        <div className="opacity-0 group-hover/code:opacity-100 transition-opacity duration-200">
          <CopyButton
            value={code}
            className="h-8 w-8 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="m-0 p-5 font-mono text-[13px] leading-relaxed text-[#e6edf3]">
          <code 
            className={`hljs language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>
    </div>
  )
}
