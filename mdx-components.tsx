"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils"
import { CodeBlock, SimpleCodeBlock, CopyButton } from "@/components/common/code"

// MDX Component types
type MDXComponents = Record<string, React.ComponentType<any>>

/**
 * MDX Components - All client-side rendering
 * Used by react-markdown and MDX content
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ className, ...props }: any) => (
      <h1
        className={cn(
          "mt-0 mb-4 scroll-mt-24 border-b border-border pb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }: any) => (
      <h2
        className={cn(
          "mt-8 mb-3 scroll-mt-24 border-t border-border pt-4 text-xl font-bold tracking-tight text-foreground first:mt-0 first:border-t-0 first:pt-0 md:text-2xl",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }: any) => (
      <h3
        className={cn(
          "mt-6 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight text-foreground md:text-xl",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }: any) => (
      <h4
        className={cn(
          "mt-5 mb-2 scroll-mt-24 text-base font-semibold tracking-tight text-foreground md:text-lg",
          className
        )}
        {...props}
      />
    ),

    // Text
    p: ({ className, ...props }: any) => (
      <p
        className={cn(
          "mb-5 text-base leading-relaxed text-foreground/90 md:text-lg",
          className
        )}
        {...props}
      />
    ),

    // Lists
    ul: ({ className, ...props }: any) => (
      <ul
        className={cn(
          "mb-5 ml-6 list-outside list-disc space-y-2.5 text-base text-foreground md:text-lg",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }: any) => (
      <ol
        className={cn(
          "mb-5 ml-6 list-outside list-decimal space-y-2.5 text-base text-foreground md:text-lg",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }: any) => (
      <li className={cn("leading-relaxed text-foreground/90", className)} {...props} />
    ),

    // Links
    a: ({ className, ...props }: any) => (
      <a
        className={cn(
          "font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary",
          className
        )}
        {...props}
      />
    ),

    // Blockquotes
    blockquote: ({ className, ...props }: any) => (
      <blockquote
        className={cn(
          "my-6 border-l-4 border-primary/50 bg-muted/30 py-4 pl-6 pr-4 italic text-foreground/80",
          className
        )}
        {...props}
      />
    ),

    // Tables
    table: ({ className, ...props }: any) => (
      <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
        <table className={cn("w-full", className)} {...props} />
      </div>
    ),
    thead: ({ className, ...props }: any) => (
      <thead className={cn("bg-muted/50", className)} {...props} />
    ),
    tr: ({ className, ...props }: any) => (
      <tr
        className={cn("border-b border-border transition-colors hover:bg-muted/30", className)}
        {...props}
      />
    ),
    th: ({ className, ...props }: any) => (
      <th
        className={cn("px-4 py-3 text-left text-sm font-semibold text-foreground", className)}
        {...props}
      />
    ),
    td: ({ className, ...props }: any) => (
      <td className={cn("px-4 py-3 text-sm text-foreground/90", className)} {...props} />
    ),

    // Inline code
    code: ({ className, ...props }: any) => (
      <code
        className={cn(
          "rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm text-primary",
          className
        )}
        {...props}
      />
    ),

    // Horizontal rule
    hr: (props: any) => <hr className="my-8 border-border" {...props} />,

    // Strong/Bold  
    strong: ({ className, ...props }: any) => (
      <strong className={cn("font-bold text-foreground", className)} {...props} />
    ),

    // Emphasis/Italic
    em: ({ className, ...props }: any) => <em className={cn("italic", className)} {...props} />,

    // Export custom components for MDX files to use
    CodeBlock,
    SimpleCodeBlock,
    CopyButton,

    ...components,
  }
}
