/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodeExecutor, ExecutionResult } from "./types"

// C++ Executor using Compiler Explorer API (free, no auth required)
// This is a frontend-only solution that uses a public API
export class CppExecutor implements CodeExecutor {
  private readonly API_URL = "https://godbolt.org/api/compiler/gcc131/compile"

  async execute(code: string): Promise<ExecutionResult> {
    const start = performance.now()
    const output: string[] = []
    let error: string | null = null

    try {
      // Prepare the request for Compiler Explorer API
      const requestBody = {
        source: code,
        options: {
          userArguments: "-std=c++17 -O2",
          compilerOptions: {
            skipAsm: false,
            executorRequest: true,
          },
          filters: {
            execute: true,
            binary: false,
            binaryObject: false,
            intel: false,
            demangle: true,
            labels: true,
            libraryCode: false,
            directives: true,
            commentOnly: true,
            trim: false,
          },
          tools: [],
          libraries: [],
        },
        lang: "c++",
        allowStoreCodeDebug: true,
      }

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`Compiler API error: ${response.statusText}`)
      }

      const result = await response.json()

      // Extract execution output
      if (result.execResult) {
        if (result.execResult.stdout) {
          output.push(result.execResult.stdout)
        }
        if (result.execResult.stderr) {
          error = result.execResult.stderr
        }
        if (result.execResult.code !== 0) {
          error = error || `Process exited with code ${result.execResult.code}`
        }
      } else if (result.asm) {
        // If execution is not available, show compilation result
        output.push("Compilation successful. Execution not available.")
        output.push("\n--- Assembly Output (first 50 lines) ---")
        const asmLines = result.asm.split("\n").slice(0, 50)
        output.push(asmLines.join("\n"))
      } else if (result.stderr && result.stderr.length > 0) {
        error = result.stderr.join("\n")
      } else {
        error = "Unknown error from compiler API"
      }

      return {
        output: output.join("\n") || "(No output)",
        error: error,
        status: error ? "error" : "success",
        executionTime: performance.now() - start,
      }
    } catch (e) {
      return {
        output: output.join("\n") || "(No output)",
        error: e instanceof Error ? e.message : String(e),
        status: "error",
        executionTime: performance.now() - start,
      }
    }
  }
}

export const cppExecutor = new CppExecutor()

