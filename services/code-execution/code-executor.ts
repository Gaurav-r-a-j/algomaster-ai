// Custom code execution service (not AI-based)
// This service handles code execution using Web Workers or API endpoints
import { JavascriptExecutor } from "./javascript-executor"
import { PythonExecutor } from "./python-executor"
import { CppExecutor } from "./cpp-executor"
import { JavaExecutor } from "./java-executor"
import { CodeExecutor, ExecutionResult, SupportedLanguage } from "./types"

export type { CodeExecutor, ExecutionResult, SupportedLanguage }

// Factory function to get executor
export function getCodeExecutor(language: SupportedLanguage): CodeExecutor {
  switch (language) {
    case "javascript":
      return new JavascriptExecutor()
    case "python":
      return new PythonExecutor()
    case "cpp":
      return new CppExecutor()
    case "java":
      return new JavaExecutor()
    default:
      return new JavascriptExecutor()
  }
}

// Export executors for direct use
export { javascriptExecutor } from "./javascript-executor"
export { pythonExecutor } from "./python-executor"
export { cppExecutor } from "./cpp-executor"
export { javaExecutor } from "./java-executor"

// Main execution function
export async function executeCode(
  code: string,
  language: SupportedLanguage
): Promise<ExecutionResult> {
  const executor = getCodeExecutor(language)
  return executor.execute(code, language)
}
