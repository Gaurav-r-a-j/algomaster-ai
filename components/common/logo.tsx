import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 font-bold", className)}>
      {/* Brain + Algorithm Icon */}
      <div className="relative flex h-7 w-7 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary h-7 w-7"
        >
          {/* Neural network / brain pattern */}
          <circle cx="12" cy="12" r="10" className="opacity-20" fill="currentColor" />
          <circle cx="12" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="14" r="2" fill="currentColor" />
          <circle cx="16" cy="14" r="2" fill="currentColor" />
          <path d="M12 10v2" />
          <path d="M10 13l-1 1" />
          <path d="M14 13l1 1" />
          <path d="M10 14l4 0" />
        </svg>
        {/* Sparkle for AI */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-primary absolute -right-1 -top-1 h-3 w-3"
        >
          <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8L12 0Z" />
        </svg>
      </div>
      <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl tracking-tight text-transparent">
        AlgoMaster
        <span className="text-primary ml-1 font-semibold">AI</span>
      </span>
    </div>
  )
}
