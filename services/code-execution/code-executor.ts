// Custom code execution service (not AI-based)
// This service handles code execution using Web Workers or API endpoints

export type SupportedLanguage = "python" | "javascript" | "cpp" | "java"

export interface ExecutionResult {
  output: string
  error: string | null
  executionTime: number
}

export interface CodeExecutor {
  execute(code: string, language: SupportedLanguage): Promise<ExecutionResult>
}

// JavaScript execution using eval (for simple cases)
class JavaScriptExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    const startTime = performance.now()
    try {
      // Capture console.log output
      const logs: string[] = []
      const originalLog = console.log
      // eslint-disable-next-line no-console
      console.log = (...args: string[]) => {
        logs.push(args.map((arg) => String(arg)).join(" "))
      }

      // Execute code
      const result = eval(code)
      const executionTime = performance.now() - startTime

      // Restore console.log
      // eslint-disable-next-line no-console
      console.log = originalLog

      // Format output
      let output = logs.join("\n")
      if (result !== undefined && result !== null) {
        output += (output ? "\n" : "") + String(result)
      }

      return {
        output: output || "Code executed successfully.",
        error: null,
        executionTime,
      }
    } catch (error) {
      return {
        output: "",
        error: error instanceof Error ? error.message : String(error),
        executionTime: performance.now() - startTime,
      }
    }
  }
}

// Python execution placeholder (would need backend API)
class PythonExecutor implements CodeExecutor {
  async execute(_code: string): Promise<ExecutionResult> {
    // In a real implementation, this would call a backend API
    // For now, return a placeholder
    return {
      output:
        "Python execution requires a backend service. This is a placeholder.",
      error: null,
      executionTime: 0,
    }
  }
}

// C++ execution placeholder (would need backend API)
class CppExecutor implements CodeExecutor {
  async execute(_code: string): Promise<ExecutionResult> {
    return {
      output:
        "C++ execution requires a backend service. This is a placeholder.",
      error: null,
      executionTime: 0,
    }
  }
}

// Java execution placeholder (would need backend API)
class JavaExecutor implements CodeExecutor {
  async execute(_code: string): Promise<ExecutionResult> {
    return {
      output:
        "Java execution requires a backend service. This is a placeholder.",
      error: null,
      executionTime: 0,
    }
  }
}

// Factory function to get executor
export function getCodeExecutor(language: SupportedLanguage): CodeExecutor {
  switch (language) {
    case "javascript":
      return new JavaScriptExecutor()
    case "python":
      return new PythonExecutor()
    case "cpp":
      return new CppExecutor()
    case "java":
      return new JavaExecutor()
    default:
      return new JavaScriptExecutor()
  }
}

// Main execution function
export async function executeCode(
  code: string,
  language: SupportedLanguage
): Promise<ExecutionResult> {
  const executor = getCodeExecutor(language)
  return executor.execute(code, language)
}
