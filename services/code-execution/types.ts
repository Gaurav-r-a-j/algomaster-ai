export type SupportedLanguage = "python" | "javascript" | "cpp" | "java"

export interface ExecutionResult {
  output: string
  error?: string | null
  status: "success" | "error" | "timeout"
  executionTime?: number
}

export interface CodeExecutor {
  initialize?(): Promise<void>
  execute(code: string, language?: SupportedLanguage): Promise<ExecutionResult>
}
