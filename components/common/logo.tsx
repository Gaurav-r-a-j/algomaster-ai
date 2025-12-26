import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 font-bold", className)}>
      {/* Brain + Algorithm Icon - Colors adapt to dark/light mode via CSS */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-primary dark:text-primary"
        >
          {/* Neural network / brain pattern */}
          <circle cx="12" cy="12" r="10" className="fill-current opacity-20 dark:opacity-30" />
          <circle cx="12" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="14" r="2" fill="currentColor" />
          <circle cx="16" cy="14" r="2" fill="currentColor" />
          <path d="M12 10v2" stroke="currentColor" />
          <path d="M10 13l-1 1" stroke="currentColor" />
          <path d="M14 13l1 1" stroke="currentColor" />
          <path d="M10 14l4 0" stroke="currentColor" />
        </svg>
        {/* Sparkle for AI */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary dark:text-primary absolute -right-1 -top-1 h-3.5 w-3.5"
        >
          <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8L12 0Z" />
        </svg>
      </div>
      <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg tracking-tight text-transparent sm:text-xl">
        AlgoMaster
        <span className="text-primary ml-1 font-semibold">AI</span>
      </span>
    </div>
  )
}
