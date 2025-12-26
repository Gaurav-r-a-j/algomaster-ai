/* eslint-disable @typescript-eslint/no-explicit-any */
import { CodeExecutor, ExecutionResult } from "./types"

/**
 * Unified code executor using Piston API
 * Supports JavaScript, Python, C++, Java with standard libraries
 * Similar to LeetCode/HackerRank execution environment
 */
export class PistonExecutor implements CodeExecutor {
    private readonly API_URL = "https://emkc.org/api/v2/piston"

    // Map our language names to Piston runtime identifiers
    private readonly LANGUAGE_MAP: Record<string, { language: string; version: string }> = {
        javascript: { language: "javascript", version: "18.15.0" }, // Node.js with standard libs
        python: { language: "python", version: "3.10.0" }, // Python 3 with standard libs
        cpp: { language: "c++", version: "10.2.0" }, // GCC with STL
        java: { language: "java", version: "15.0.2" }, // OpenJDK with standard libs
    }

    async execute(code: string, language: string = "javascript"): Promise<ExecutionResult> {
        const startTime = performance.now()

        try {
            // Get the runtime configuration for this language
            const runtime = this.LANGUAGE_MAP[language]
            if (!runtime) {
                throw new Error(`Unsupported language: ${language}`)
            }

            // Prepare the request payload
            const payload = {
                language: runtime.language,
                version: runtime.version,
                files: [
                    {
                        name: this.getFileName(language),
                        content: code,
                    },
                ],
                stdin: "",
                args: [],
                compile_timeout: 10000, // 10 seconds
                run_timeout: 3000, // 3 seconds
                compile_memory_limit: -1,
                run_memory_limit: -1,
            }

            // Execute code via Piston API
            const response = await fetch(`${this.API_URL}/execute`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                throw new Error(`Piston API error: ${response.statusText}`)
            }

            const result = await response.json()
            const executionTime = performance.now() - startTime

            // Parse the result
            let output = ""
            let error: string | null = null
            let status: "success" | "error" | "timeout" = "success"

            // Check for compilation errors (for compiled languages)
            if (result.compile && result.compile.code !== 0) {
                error = result.compile.stderr || result.compile.output || "Compilation failed"
                status = "error"
            }
            // Check for runtime errors
            else if (result.run) {
                output = result.run.stdout || ""

                if (result.run.stderr) {
                    error = result.run.stderr
                }

                if (result.run.code !== 0) {
                    status = "error"
                    if (!error) {
                        error = `Process exited with code ${result.run.code}`
                    }
                }

                // Check for timeout
                if (result.run.signal === "SIGTERM" || result.run.signal === "SIGKILL") {
                    status = "timeout"
                    error = "Execution timed out"
                }
            } else {
                error = "Unknown execution error"
                status = "error"
            }

            return {
                output: output || "(No output)",
                error: error,
                status: status,
                executionTime: executionTime,
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e)
            return {
                output: "",
                error: errorMessage,
                status: "error",
                executionTime: performance.now() - startTime,
            }
        }
    }

    /**
     * Get the appropriate filename for each language
     */
    private getFileName(language: string): string {
        switch (language) {
            case "javascript":
                return "main.js"
            case "python":
                return "main.py"
            case "cpp":
                return "main.cpp"
            case "java":
                return "Main.java"
            default:
                return "main.txt"
        }
    }

    /**
     * Get available runtimes from Piston API
     * Useful for debugging and checking available versions
     */
    async getRuntimes(): Promise<any> {
        try {
            const response = await fetch(`${this.API_URL}/runtimes`)
            if (!response.ok) {
                throw new Error(`Failed to fetch runtimes: ${response.statusText}`)
            }
            return await response.json()
        } catch (e) {
            console.error("Error fetching Piston runtimes:", e)
            return []
        }
    }
}

// Export singleton instance
export const pistonExecutor = new PistonExecutor()
