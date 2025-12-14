/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodeExecutor, ExecutionResult } from "./types"

declare global {
  interface Window {
    loadPyodide: (config: { indexURL: string }) => Promise<any>
    pyodide: any
  }
}

const PYODIDE_VERSION = "0.25.0"
const PYODIDE_BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

export class PythonExecutor implements CodeExecutor {
  private pyodide: any = null
  private pyodideLoadingPromise: Promise<void> | null = null

  private async loadPyodideScript(): Promise<void> {
    if (window.pyodide) {
      this.pyodide = window.pyodide
      return
    }

    if (document.getElementById("pyodide-script")) {
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (window.pyodide) {
            clearInterval(check)
            this.pyodide = window.pyodide
            resolve()
          }
        }, 100)
      })
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script")
      script.id = "pyodide-script"
      script.src = `${PYODIDE_BASE_URL}pyodide.js`
      script.onload = async () => {
        try {
          this.pyodide = await window.loadPyodide({
            indexURL: PYODIDE_BASE_URL,
          })
          window.pyodide = this.pyodide
          resolve()
        } catch (err) {
          reject(err)
        }
      }
      script.onerror = () => reject(new Error("Failed to load Pyodide script"))
      document.body.appendChild(script)
    })
  }

  async initialize(): Promise<void> {
    if (!this.pyodideLoadingPromise) {
      this.pyodideLoadingPromise = this.loadPyodideScript()
    }
    await this.pyodideLoadingPromise
  }

  async execute(code: string): Promise<ExecutionResult> {
    const startTime = performance.now()
    try {
      if (!this.pyodide) {
        await this.initialize()
      }

      // Capture stdout
      this.pyodide.setStdout({
        batched: (_str: string) => {
          // We will capture this in the execution return
        },
      })

      // Override stdout manually for simpler capturing
      const captureCode = `
import sys
import io
sys.stdout = io.StringIO()
`
      await this.pyodide.runPythonAsync(captureCode)

      // Run the user code
      await this.pyodide.runPythonAsync(code)

      // Get stdout
      const stdout = await this.pyodide.runPythonAsync("sys.stdout.getvalue()")

      const executionTime = performance.now() - startTime
      return {
        output: stdout,
        error: null,
        executionTime,
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      return {
        output: "",
        error: errorMessage,
        executionTime: performance.now() - startTime,
      }
    }
  }
}
