"use client"

import { useEffect, useRef, useState } from "react"
import { javascriptExecutor } from "@/services/code-execution/javascript-executor"
import { pythonExecutor } from "@/services/code-execution/python-executor"
import { ArrowPathIcon, PlayIcon } from "@heroicons/react/24/solid"
import Editor, { OnMount } from "@monaco-editor/react"

import { SupportedLanguage, Topic } from "@/types/curriculum"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
  isSidebarOpen = true 
}: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<
    "idle" | "running" | "success" | "error" | "timeout"
  >("idle")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null)

  useEffect(() => {
    // Reset code when topic, language, or initialCode changes
    const starter =
      initialCode?.[language] ||
      topic?.starterCode?.[language] ||
      getDefaultStarterCode(language)
    setCode(starter)
    if (editorRef.current) {
      editorRef.current.setValue(starter)
    }
    setOutput("")
    setStatus("idle")
  }, [topic, language, initialCode])

  const handleEditorDidMount: OnMount = (editor, _monaco) => {
    editorRef.current = editor
  }

  const handleRun = async () => {
    // Get latest code from state or editor
    const currentCode = editorRef.current ? editorRef.current.getValue() : code

    setIsRunning(true)
    setStatus("running")
    setOutput("Running...")

    try {
      let result
      if (language === "javascript") {
        result = await javascriptExecutor.execute(currentCode)
      } else if (language === "python") {
        result = await pythonExecutor.execute(currentCode)
      } else {
        // Mocking for C++/Java as they require complex backends
        await new Promise((resolve) => setTimeout(resolve, 800))
        result = {
          output: `[System] ${LANGUAGES.find((l) => l.value === language)?.label} runtime requires backend connection.\n[System] (Simulation) Executing...\nHello World from ${language}!`,
          status: "success" as const,
        }
      }

      setOutput(result.output || "(No output)")
      if (result.error) {
        setOutput((prev) => prev + "\nError: " + result.error)
        setStatus("error")
      } else {
        setStatus(result.status)
      }
    } catch (e) {
      setOutput(`Error: ${e}`)
      setStatus("error")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="bg-card flex h-full min-h-[600px] flex-col overflow-hidden rounded-lg border">
      {/* Toolbar */}
      <div className="bg-muted/30 flex items-center justify-between border-b p-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle */}
          {onToggleSidebar && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              onClick={onToggleSidebar}
              title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </Button>
          )}

          <div className="bg-border/60 h-4 w-px hidden sm:block"></div>

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
          >
            {isRunning ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <PlayIcon className="h-4 w-4" />
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
              <Editor
                height="100%"
                defaultLanguage={language === "cpp" ? "cpp" : language}
                language={language === "cpp" ? "cpp" : language}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                onMount={handleEditorDidMount}
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
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-white/10" />

          {/* Bottom Panel: Console */}
          <ResizablePanel defaultSize={30} minSize={10}>
            <div className="flex h-full flex-col bg-[#1e1e1e]">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
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
              <div className="flex-1 overflow-auto p-4 font-mono text-sm">
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
                    <PlayIcon className="h-8 w-8" />
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
      return "console.log('Hello from JavaScript!');"
    case "python":
      return "print('Hello from Python!')"
    case "cpp":
      return '#include <iostream>\n\nint main() {\n    std::cout << "Hello from C++!" << std::endl;\n    return 0;\n}'
    case "java":
      return 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from Java!");\n    }\n}'
    default:
      return ""
  }
}
