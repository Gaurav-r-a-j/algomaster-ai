"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { pistonExecutor } from "@/services/code-execution/piston-executor"
import { PlayIcon } from "@/lib/icons"
import { ArrowPathIcon } from "@heroicons/react/24/solid"
import Editor, { OnMount, loader } from "@monaco-editor/react"

// Configure Monaco to load from CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs'
  }
})

import { SupportedLanguage, Topic } from "@/types/curriculum"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CodePlaygroundProps {
  topic?: Topic
  initialCode?: Record<SupportedLanguage, string>
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
}

const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" }, // Label simplified for UI
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

export function CodePlayground({
  topic,
  initialCode,
  onToggleSidebar,
  isSidebarOpen = true,
}: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "running" | "success" | "error" | "timeout"
  >("idle")
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [editorError, setEditorError] = useState<string | null>(null)
  const [editorLoadTimeout, setEditorLoadTimeout] = useState(false)
  const [editorKey, setEditorKey] = useState(0)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)

  // Add timeout for editor loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isEditorReady && !editorError) {
        setEditorLoadTimeout(true)
        setEditorError("Editor is taking too long to load. Please try refreshing or retry.")
      }
    }, 30000) // 30 second timeout for initial editor load

    return () => clearTimeout(timeout)
  }, [isEditorReady, editorError])

  // Reset editor state when retrying
  const handleRetryEditor = useCallback(() => {
    setEditorError(null)
    setEditorLoadTimeout(false)
    setIsEditorReady(false)
    setEditorKey((prev) => prev + 1) // Force remount
  }, [])

  // Memoize starter code calculation
  const starterCode = useMemo(() => {
    return (
      initialCode?.[language] ||
      topic?.starterCode?.[language] ||
      getDefaultStarterCode(language)
    )
  }, [initialCode, topic?.starterCode, language])

  useEffect(() => {
    // Reset code when topic, language, or initialCode changes
    setCode(starterCode)
    if (editorRef.current) {
      editorRef.current.setValue(starterCode)
    }
    setOutput("")
    setStatus("idle")
  }, [starterCode])

  const handleEditorDidMount: OnMount = useCallback((editor, monaco) => {
    try {
      editorRef.current = editor
      setIsEditorReady(true)
      setEditorError(null)
      setEditorLoadTimeout(false)

      if (monaco) {
        monaco.editor.setTheme("vs-dark")
      }

      // Set initial code if editor is ready
      if (editor && starterCode) {
        editor.setValue(starterCode)
        setCode(starterCode)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Monaco editor initialization error:", error)
      }
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : "Failed to initialize editor"
      setEditorError(errorMessage)
      setIsEditorReady(false)
    }
  }, [starterCode])

  const handleEditorWillMount = () => {
    setIsEditorReady(false)
    setEditorError(null)
  }

  const handleRun = useCallback(async () => {
    // Get latest code from state or editor
    const currentCode = editorRef.current ? editorRef.current.getValue() : code

    setIsRunning(true)
    setStatus("running")
    setOutput("Running...")

    try {
      // Use unified Piston executor for all languages
      const result = await pistonExecutor.execute(currentCode, language)

      setOutput(result.output || "(No output)")
      if (result.error) {
        setOutput((prev) => prev + "\nError: " + result.error)
        setStatus("error")
      } else {
        setStatus(result.status)
      }
    } catch (e) {
      const errorMessage = e instanceof Error
        ? e.message
        : typeof e === 'string'
          ? e
          : String(e)
      setOutput(`Error: ${errorMessage}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }, [code, language])

  return (
    <div className="bg-card flex h-full min-h-[600px] flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="bg-muted/30 flex items-center justify-between border-b p-3.5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground h-9 w-9"
              onClick={onToggleSidebar}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </Button>
          )}

          <div className="bg-border/60 hidden h-4 w-px sm:block"></div>

          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as SupportedLanguage)}
          >
            <SelectTrigger className="bg-background border-border/60 h-9 w-[140px] text-xs font-semibold">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="text-xs"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="bg-border/60 h-4 w-px"></div>

          <span className="text-muted-foreground text-xs font-medium">
            main.
            {language === "cpp"
              ? "cpp"
              : language === "python"
                ? "py"
                : language === "java"
                  ? "java"
                  : "js"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={cn(
              "h-9 gap-2 px-4 font-semibold transition-all",
              status === "success" &&
              "bg-emerald-600 text-white hover:bg-emerald-700",
              status === "error" &&
              "bg-destructive hover:bg-destructive/90 text-white"
            )}
            onClick={handleRun}
            disabled={isRunning}
            aria-label={isRunning ? "Code is running" : "Run code"}
            aria-busy={isRunning}
          >
            {isRunning ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <IconWrapper icon={PlayIcon} size={16} />
            )}
            {isRunning ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-[#1e1e1e]">
        <ResizablePanelGroup direction="vertical">
          {/* Top Panel: Editor */}
          <ResizablePanel defaultSize={70} minSize={30}>
            <div className="relative h-full w-full">
              {editorError || editorLoadTimeout ? (
                <div
                  className="flex h-full items-center justify-center bg-[#1e1e1e] p-8"
                  role="alert"
                  aria-live="assertive"
                >
                  <div className="text-center space-y-3">
                    <p className="text-red-400 font-semibold">Editor Error</p>
                    <p className="text-zinc-400 text-sm" aria-label="Error message">
                      {editorError || "Editor failed to load"}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditorError(null)
                          setEditorLoadTimeout(false)
                          setIsEditorReady(false)
                          // Force remount by changing key
                          window.location.reload()
                        }}
                      >
                        Reload Page
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRetryEditor}
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <Editor
                  key={`editor-${language}-${editorKey}`}
                  height="100%"
                  defaultLanguage={language === "cpp" ? "cpp" : language}
                  language={language === "cpp" ? "cpp" : language}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  beforeMount={handleEditorWillMount}
                  loading={
                    <div className="flex h-full items-center justify-center bg-[#1e1e1e]">
                      <div className="text-center space-y-3">
                        <ArrowPathIcon className="h-8 w-8 animate-spin text-primary mx-auto" />
                        <div className="space-y-1">
                          <p className="text-zinc-300 text-sm font-medium">Loading editor...</p>
                          <p className="text-zinc-500 text-xs">Initializing Monaco Editor</p>
                        </div>
                      </div>
                    </div>
                  }
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontLigatures: true,
                  }}
                />
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-white/10" />

          {/* Bottom Panel: Console */}
          <ResizablePanel defaultSize={30} minSize={10}>
            <div className="flex h-full flex-col bg-[#1e1e1e]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2.5">
                <span className="text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
                  Console Output
                </span>
                {status === "success" && (
                  <span className="font-mono text-[10px] text-emerald-400">
                    Exit Code: 0
                  </span>
                )}
                {status === "error" && (
                  <span className="font-mono text-[10px] text-red-400">
                    Exit Code: 1
                  </span>
                )}
              </div>
              <div className="flex-1 overflow-auto p-5 font-mono text-sm">
                {output ? (
                  <pre
                    className={cn(
                      "leading-relaxed whitespace-pre-wrap",
                      status === "error" ? "text-red-400" : "text-zinc-300"
                    )}
                  >
                    {output}
                  </pre>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center space-y-2 text-zinc-600 opacity-50">
                    <IconWrapper icon={PlayIcon} size={32} />
                    <span className="text-xs">Run code to see output</span>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

function getDefaultStarterCode(lang: SupportedLanguage): string {
  switch (lang) {
    case "javascript":
      return `// Common libraries available (Node.js environment)
// const assert = require('assert');
// const fs = require('fs');

console.log('Hello from JavaScript!');`
    case "python":
      return `# Common libraries available
# import sys
# import math
# import collections
# from typing import List, Dict, Set

print('Hello from Python!')`
    case "cpp":
      return `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`
    case "java":
      return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from Java!");
    }
}`
    default:
      return ""
  }
}
