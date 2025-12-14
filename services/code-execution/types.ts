export type SupportedLanguage = "python" | "javascript" | "cpp" | "java"

export interface ExecutionResult {
  output: string
  error: string | null
  executionTime: number
}

export interface CodeExecutor {
  execute(code: string, language?: SupportedLanguage): Promise<ExecutionResult>
}
