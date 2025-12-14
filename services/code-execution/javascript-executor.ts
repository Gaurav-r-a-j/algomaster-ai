import { getQuickJS } from "quickjs-emscripten"

import { CodeExecutor, ExecutionResult } from "./types"

export class JavaScriptExecutor implements CodeExecutor {
  async execute(code: string): Promise<ExecutionResult> {
    const startTime = performance.now()
    try {
      const QuickJS = await getQuickJS()
      const vm = QuickJS.newContext()

      const logs: string[] = []
      const logHandle = vm.newFunction("log", (...args) => {
        const nativeArgs = args.map(vm.dump)
        logs.push(nativeArgs.join(" "))
      })

      const consoleHandle = vm.newObject()
      vm.setProp(consoleHandle, "log", logHandle)
      vm.setProp(vm.global, "console", consoleHandle)

      consoleHandle.dispose()
      logHandle.dispose()

      const result = vm.evalCode(code)

      if (result.error) {
        const error = vm.dump(result.error)
        result.error.dispose()
        vm.dispose()
        throw new Error(String(error))
      }

      const value = vm.dump(result.value)
      result.value.dispose()
      vm.dispose()

      let finalOutput = logs.join("\n")
      if (value !== undefined && value !== null) {
          if (finalOutput) {
            finalOutput += "\n"
          }
          finalOutput += String(value)
      }

      return {
        output: finalOutput || "Code executed successfully.",
        error: null,
        executionTime: performance.now() - startTime,
      }
    } catch (error) {
      return {
        output: "",
        error: error instanceof Error ? error.message : String(error),
        executionTime: performance.now() - startTime,
      }
    }
  }
}
