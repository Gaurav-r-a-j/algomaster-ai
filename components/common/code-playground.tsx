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

  useEffect(() => {
    const newCode = initialCode?.[language] || DEFAULT_CODE[language];
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      setCode(newCode);
      setOutput(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [initialCode, language]);  

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Compiling and executing...");
    // TODO: Integrate with code execution service
    setTimeout(() => {
      setOutput("Code execution coming soon. This will integrate with Gemini API.");
      setIsRunning(false);
    }, 1000);
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
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-full p-4 font-mono text-sm bg-background text-foreground resize-none focus:outline-none"
          placeholder="Write your code here..."
        />
        {output && (
          <div className="border-t border-border p-4 bg-muted/50">
            <div className="text-xs font-semibold text-muted-foreground mb-2">
              OUTPUT:
            </div>
            <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
              {output}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

