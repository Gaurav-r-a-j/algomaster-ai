// Custom code execution service (not AI-based)
// This service handles code execution using Piston API
import { pistonExecutor } from "./piston-executor"
import { CodeExecutor, ExecutionResult, SupportedLanguage } from "./types"

export type { CodeExecutor, ExecutionResult, SupportedLanguage }

// Export the unified Piston executor
export { pistonExecutor }

// Factory function to get executor (now returns Piston executor for all languages)
export function getCodeExecutor(language: SupportedLanguage): CodeExecutor {
  return pistonExecutor
}

// Main execution function
export async function executeCode(
  code: string,
  language: SupportedLanguage
): Promise<ExecutionResult> {
  return pistonExecutor.execute(code, language)
}
