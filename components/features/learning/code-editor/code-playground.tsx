"use client";

import { useState, useEffect, useRef } from "react";
import { PlayIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import Editor, { OnMount } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Topic, SupportedLanguage } from "@/types/curriculum";
import { javascriptExecutor } from "@/services/code-executor/javascript-executor";
import { cn } from "@/lib/utils";

interface CodePlaygroundProps {
  topic: Topic;
}

const LANGUAGES: { value: SupportedLanguage; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" }, // Label simplified for UI
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
];

export function CodePlayground({ topic }: CodePlaygroundProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error" | "timeout">("idle");
  
  const editorRef = useRef<any>(null);

  useEffect(() => {
    // Reset code when topic or language changes
    const starter = topic.starterCode?.[language] || getDefaultStarterCode(language);
    setCode(starter);
    if (editorRef.current) {
        editorRef.current.setValue(starter);
    }
    setOutput("");
    setStatus("idle");
  }, [topic, language]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleRun = async () => {
    // Get latest code from state or editor
    const currentCode = editorRef.current ? editorRef.current.getValue() : code;
    
    setIsRunning(true);
    setStatus("running");
    setOutput("Running...");

    try {
      let result;
      if (language === "javascript") {
        result = await javascriptExecutor.execute(currentCode);
      } else {
        // Mocking for now as per plan
        await new Promise((resolve) => setTimeout(resolve, 800));
        result = {
            output: `[System] ${LANGUAGES.find(l => l.value === language)?.label} runtime requires backend connection.\n[System] (Simulation) Executing...\nHello World from ${language}!`,
            status: "success" as const
        };
      }

      setOutput(result.output || "(No output)");
      if (result.error) {
          setOutput((prev) => prev + "\nError: " + result.error);
          setStatus("error");
      } else {
          setStatus(result.status);
      }
    } catch (e) {
      setOutput(`Error: ${e}`);
      setStatus("error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] border rounded-xl overflow-hidden bg-card shadow-sm ring-1 ring-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-muted/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
            <Select
                value={language}
                onValueChange={(v) => setLanguage(v as SupportedLanguage)}
            >
            <SelectTrigger className="w-[140px] h-9 text-xs font-semibold bg-background border-border/60">
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs">
                    {lang.label}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>

            <div className="w-px h-4 bg-border/60"></div>

            <span className="text-xs text-muted-foreground font-medium">
                main.{language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : "js"}
            </span>
        </div>

        <div className="flex items-center gap-2">
            <Button 
                size="sm" 
                className={cn(
                    "h-9 px-4 gap-2 transition-all font-semibold shadow-sm",
                    status === "success" && "bg-emerald-600 hover:bg-emerald-700 text-white",
                    status === "error" && "bg-destructive hover:bg-destructive/90 text-white"
                )}
                onClick={handleRun}
                disabled={isRunning}
            >
                {isRunning ? (
                    <ArrowPathIcon className="w-4 h-4 animate-spin" />
                ) : (
                    <PlayIcon className="w-4 h-4" />
                )}
                {isRunning ? "Running..." : "Run"}
            </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-[#1e1e1e]">
        {/* Editor Area */}
        <div className="flex-1 relative border-r border-white/10">
            <Editor
                height="100%"
                defaultLanguage={language === "cpp" ? "cpp" : language}
                language={language === "cpp" ? "cpp" : language} // mapped for monaco
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

        {/* Console Area */}
        <div className="h-[250px] lg:h-auto lg:w-[40%] bg-[#1e1e1e] flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Console Output</span>
                {status === "success" && <span className="text-[10px] text-emerald-400 font-mono">Exit Code: 0</span>}
                {status === "error" && <span className="text-[10px] text-red-400 font-mono">Exit Code: 1</span>}
            </div>
            <div className="flex-1 p-4 overflow-auto font-mono text-sm">
                {output ? (
                    <pre className={cn(
                        "whitespace-pre-wrap leading-relaxed",
                        status === "error" ? "text-red-400" : "text-zinc-300"
                    )}>
                        {output}
                    </pre>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2 opacity-50">
                        <PlayIcon className="w-8 h-8" />
                        <span className="text-xs">Run code to see output</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

function getDefaultStarterCode(lang: SupportedLanguage): string {
    switch (lang) {
        case "javascript": return "console.log('Hello from JavaScript!');";
        case "python": return "print('Hello from Python!')";
        case "cpp": return "#include <iostream>\n\nint main() {\n    std::cout << \"Hello from C++!\" << std::endl;\n    return 0;\n}";
        case "java": return "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello from Java!\");\n    }\n}";
        default: return "";
    }
}
