// Custom code execution service (not AI-based)
// This service handles code execution using Web Workers or API endpoints
import { JavaScriptExecutor } from "./javascript-executor"
import { PythonExecutor } from "./python-executor"
import { CodeExecutor, ExecutionResult, SupportedLanguage } from "./types"

export type { CodeExecutor, ExecutionResult, SupportedLanguage }

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
