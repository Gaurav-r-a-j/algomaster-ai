"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { CodeIcon, PlayIcon, RefreshCwIcon } from "@/lib/icons";
import type { SupportedLanguage } from "@/types/curriculum";

interface CodePlaygroundProps {
  initialCode?: Record<SupportedLanguage, string>;
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
};

export function CodePlayground({
  initialCode,
}: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState<string>(
    initialCode?.python || DEFAULT_CODE.python
  );
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize code when language or initialCode changes
  useEffect(() => {
    const newCode = initialCode?.[language] || DEFAULT_CODE[language];
    // Use startTransition or setTimeout to defer state updates
    const timer = setTimeout(() => {
      setCode(newCode);
      setOutput(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialCode, language]);  

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Compiling and executing...");
    
    try {
      // Import and use custom code executor (not AI-based)
      const { executeCode } = await import("@/services/code-execution/code-executor");
      const result = await executeCode(code, language);
      
      if (result.error) {
        setOutput(`Error: ${result.error}\n\nExecution time: ${result.executionTime.toFixed(2)}ms`);
      } else {
        setOutput(`${result.output}\n\nExecution time: ${result.executionTime.toFixed(2)}ms`);
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will discard your changes.")) {
      setCode(initialCode?.[language] || DEFAULT_CODE[language]);
      setOutput(null);
    }
  };

  return (
    <Card className="flex flex-col h-full bg-background rounded-xl border shadow-lg">
      {/* Toolbar */}
      <CardHeader className="flex items-center justify-between px-3 py-2 border-b shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <IconWrapper icon={CodeIcon} size={16} className="text-muted-foreground" />
            <span className="font-medium text-muted-foreground text-sm">
              EDITOR
            </span>
          </div>
          <div className="h-4 w-px bg-border" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
            className="bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer hover:text-primary transition-colors"
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
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <IconWrapper icon={RefreshCwIcon} size={14} />
          </button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none"
          >
            <IconWrapper icon={PlayIcon} size={14} className="mr-2" />
            Run Code
          </Button>
        </div>
      </CardHeader>

      {/* Editor Area */}
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 relative flex overflow-hidden">
          {/* Line Numbers */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-muted/30 pt-4 flex flex-col items-end pr-3 text-muted-foreground select-none pointer-events-none font-mono text-sm leading-relaxed">
            {code.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full pl-16 pr-4 py-4 bg-background text-foreground resize-none focus:outline-none font-mono text-sm leading-relaxed selection:bg-primary/20"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
        {output && (
          <div className="border-t border-border flex flex-col h-[35%]">
            <div className="px-4 py-2 bg-muted/50 border-b border-border flex justify-between items-center shrink-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <IconWrapper icon={CodeIcon} size={12} />
                CONSOLE OUTPUT
              </span>
              <button
                onClick={() => setOutput(null)}
                className="text-[10px] text-muted-foreground hover:text-destructive uppercase font-bold transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="flex-1 p-4 font-mono text-xs overflow-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Running...
                </div>
              ) : (
                <pre
                  className={`whitespace-pre-wrap leading-relaxed ${
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
  );
}

