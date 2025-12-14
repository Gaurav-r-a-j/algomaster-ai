import { getQuickJS, QuickJSContext, QuickJSWASMModule } from "quickjs-emscripten";
import { ExecutionResult, ICodeExecutor } from "./types";

export class JavascriptExecutor implements ICodeExecutor {
  private module: QuickJSWASMModule | null = null;

  async initialize(): Promise<void> {
    if (!this.module) {
      this.module = await getQuickJS();
    }
  }

  async execute(code: string): Promise<ExecutionResult> {
    if (!this.module) {
      await this.initialize();
    }

    const start = performance.now();
    let vm: QuickJSContext | null = null;
    let output: string[] = [];

    try {
      vm = this.module!.newContext();
      
      // Mock console.log
      const logHandle = vm.newFunction("log", (...args) => {
        const nativeArgs = args.map(vm!.dump);
        output.push(nativeArgs.join(" "));
      });
      const consoleHandle = vm.newObject();
      vm.setProp(consoleHandle, "log", logHandle);
      vm.setProp(vm.global, "console", consoleHandle);
      
      // Dispose handles
      consoleHandle.dispose();
      logHandle.dispose();

      // Execute code
      const result = vm.evalCode(code);

      if (result.error) {
        const error = vm.dump(result.error);
        result.error.dispose();
        return {
          output: output.join("\n"),
          error: String(error),
          status: "error",
          executionTime: performance.now() - start,
        };
      }

      const value = vm.dump(result.value);
      result.value.dispose();

      // If the code returns a value (like last expression), we can append it or ignore it.
      // Usually, we care about console output.
      
      return {
        output: output.join("\n"),
        status: "success",
        executionTime: performance.now() - start,
      };

    } catch (e) {
      return {
        output: output.join("\n"),
        error: String(e),
        status: "error",
        executionTime: performance.now() - start,
      };
    } finally {
      if (vm) {
        vm.dispose();
      }
    }
  }
}

export const javascriptExecutor = new JavascriptExecutor();
