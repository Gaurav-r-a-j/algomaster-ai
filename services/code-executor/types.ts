export type ExecutionStatus = "success" | "error" | "timeout"

export interface ExecutionResult {
  output: string
  error?: string
  status: ExecutionStatus
  executionTime?: number // in milliseconds
}

export interface ICodeExecutor {
  initialize(): Promise<void>
  execute(code: string): Promise<ExecutionResult>
}
