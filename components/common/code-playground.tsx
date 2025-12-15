"use client"

import { useEffect, useState } from "react"

import type { SupportedLanguage } from "@/types/curriculum"
import { CodeIcon, PlayIcon, RefreshCwIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface CodePlaygroundProps {
  initialCode?: Record<SupportedLanguage, string>
}

const DEFAULT_CODE: Record<SupportedLanguage, string> = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, AlgoMaster!" << endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, AlgoMaster!");
    }
}`,
  python: `print("Hello, AlgoMaster!")`,
  javascript: `console.log("Hello, AlgoMaster!");`,
}

export function CodePlayground({ initialCode }: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("python")
  const [code, setCode] = useState<string>(
    initialCode?.python || DEFAULT_CODE.python
  )
  const [output, setOutput] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  // Initialize code when language or initialCode changes
  useEffect(() => {
    const newCode = initialCode?.[language] || DEFAULT_CODE[language]
    // Use startTransition or setTimeout to defer state updates
    const timer = setTimeout(() => {
      setCode(newCode)
      setOutput(null)
    }, 0)
    return () => clearTimeout(timer)
  }, [initialCode, language])

  const handleRun = async () => {
    setIsRunning(true)
    setOutput("Compiling and executing...")

    try {
      // Import and use custom code executor (not AI-based)
      const { executeCode } =
        await import("@/services/code-execution/code-executor")
      const result = await executeCode(code, language)

      if (result.error) {
        setOutput(
          `Error: ${result.error}\n\nExecution time: ${(result.executionTime || 0).toFixed(2)}ms`
        )
      } else {
        setOutput(
          `${result.output}\n\nExecution time: ${(result.executionTime || 0).toFixed(2)}ms`
        )
      }
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      )
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    if (window.confirm("Are you sure? This will discard your changes.")) {
      setCode(initialCode?.[language] || DEFAULT_CODE[language])
      setOutput(null)
    }
  }

  return (
    <Card className="bg-background flex h-full flex-col rounded-xl border shadow-lg">
      {/* Toolbar */}
      <CardHeader className="flex shrink-0 items-center justify-between border-b px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IconWrapper
              icon={CodeIcon}
              size={16}
              className="text-muted-foreground"
            />
            <span className="text-muted-foreground text-sm font-medium">
              EDITOR
            </span>
          </div>
          <div className="bg-border h-4 w-px" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="text-foreground hover:text-primary cursor-pointer bg-transparent text-sm font-medium transition-colors focus:outline-none"
          >
            <option value="python">Python 3</option>
            <option value="cpp">C++ 20</option>
            <option value="java">Java 17</option>
            <option value="javascript">JavaScript (Node)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Reset Code"
            className="text-muted-foreground hover:text-foreground p-1.5 transition-colors"
          >
            <IconWrapper icon={RefreshCwIcon} size={14} />
          </button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="border-none bg-emerald-600 font-bold text-white hover:bg-emerald-700"
          >
            <IconWrapper icon={PlayIcon} size={14} className="mr-2" />
            Run Code
          </Button>
        </div>
      </CardHeader>

      {/* Editor Area */}
      <CardContent className="flex flex-1 flex-col overflow-hidden p-0">
        <div className="relative flex flex-1 overflow-hidden">
          {/* Line Numbers */}
          <div className="bg-muted/30 text-muted-foreground pointer-events-none absolute top-0 bottom-0 left-0 flex w-12 flex-col items-end pt-4 pr-3 font-mono text-sm leading-relaxed select-none">
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-background text-foreground selection:bg-primary/20 w-full flex-1 resize-none py-4 pr-4 pl-16 font-mono text-sm leading-relaxed focus:outline-none"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
        {output && (
          <div className="border-border flex h-[35%] flex-col border-t">
            <div className="bg-muted/50 border-border flex shrink-0 items-center justify-between border-b px-4 py-2">
              <span className="text-muted-foreground flex items-center gap-2 text-xs font-semibold tracking-wider uppercase">
                <IconWrapper icon={CodeIcon} size={12} />
                CONSOLE OUTPUT
              </span>
              <button
                onClick={() => setOutput(null)}
                className="text-muted-foreground hover:text-destructive text-[10px] font-bold uppercase transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-xs">
              {isRunning ? (
                <div className="text-muted-foreground flex animate-pulse items-center gap-2">
                  <div className="bg-primary h-2 w-2 rounded-full"></div>
                  Running...
                </div>
              ) : (
                <pre
                  className={`leading-relaxed whitespace-pre-wrap ${
                    output.startsWith("Error") || output.startsWith("error")
                      ? "text-destructive"
                      : "text-foreground"
                  }`}
                >
                  {output}
                </pre>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
