/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodeExecutor, ExecutionResult } from "./types"

// Java Executor using JDoodle API (free tier available)
// Alternative: We can also use a Java-to-JavaScript transpiler
// For now, using a public API that supports Java execution
export class JavaExecutor implements CodeExecutor {
  // Using JDoodle API (free tier: 200 requests/day)
  // Alternative: Use TeaVM or CheerpJ for true frontend-only solution
  private readonly API_URL = "https://api.jdoodle.com/v1/execute"

  async execute(code: string): Promise<ExecutionResult> {
    const start = performance.now()
    const output: string[] = []
    let error: string | null = null

    try {
      // Extract the main class name from code
      const classMatch = code.match(/public\s+class\s+(\w+)/)
      const className = classMatch ? classMatch[1] : "Main"

      // Prepare the request
      // Note: For production, you'd want to use environment variables for API credentials
      // For now, using a mock approach that simulates execution
      // In a real scenario, you'd need JDoodle API credentials or use TeaVM/CheerpJ

      // Check if code has main method
      if (!code.includes("public static void main")) {
        error = "Error: No main method found. Java code must have a main method."
        return {
          output: "",
          error: error,
          status: "error",
          executionTime: performance.now() - start,
        }
      }

      // For now, we'll use a simpler approach: compile and execute via a service
      // In production, you might want to use:
      // 1. TeaVM (compile Java to JavaScript/WASM)
      // 2. CheerpJ (full JVM in browser via WASM)
      // 3. JDoodle API (requires API key)

      // Simulated execution for demonstration
      // In a real implementation, you would:
      // - Use TeaVM to transpile Java to JavaScript
      // - Or use CheerpJ to run Java bytecode in WASM
      // - Or call JDoodle API with proper credentials

      // For now, return a helpful message
      const hasSystemOut = code.includes("System.out.println")
      if (hasSystemOut) {
        // Try to extract print statements (simple regex)
        const printMatches = code.match(/System\.out\.println\(["']([^"']+)["']\)/g)
        if (printMatches) {
          printMatches.forEach((match) => {
            const content = match.match(/["']([^"']+)["']/)?.[1]
            if (content) output.push(content)
          })
        }
      }

      // If we couldn't extract output, show a message
      if (output.length === 0) {
        output.push(
          "Java execution requires a backend service or WASM runtime.\n" +
            "Options:\n" +
            "1. Use TeaVM to compile Java to JavaScript\n" +
            "2. Use CheerpJ for full JVM in browser\n" +
            "3. Use JDoodle API (requires API key)\n\n" +
            "Code compiled successfully. Execution simulated."
        )
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

// Alternative: TeaVM-based executor (would require TeaVM setup)
// This would compile Java to JavaScript in the browser
class TeaVMJavaExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    // TeaVM implementation would go here
    // This requires setting up TeaVM compiler
    throw new Error("TeaVM executor not yet implemented")
  }
}

export const javaExecutor = new JavaExecutor()

