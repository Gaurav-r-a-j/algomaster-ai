"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// MarkdownRenderer - Component to render markdown content with syntax highlighting
// Example: <MarkdownRenderer content={markdownContent} />
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code: ({ className: codeClassName, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(codeClassName || "");
            const inline = !match;
            
            if (!inline && match) {
              return (
                <pre className="bg-muted border border-border p-4 rounded-lg overflow-x-auto my-4">
                  <code className={codeClassName} {...props}>
                    {children}
                  </code>
                </pre>
              );
            }
            
            return (
              <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ ...props }: any) => (
            <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4 mt-8 first:mt-0" {...props} />
          ),
          h2: ({ ...props }: any) => (
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-3 mt-6" {...props} />
          ),
          h3: ({ ...props }: any) => (
            <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-2 mt-5" {...props} />
          ),
          h4: ({ ...props }: any) => (
            <h4 className="text-xl font-semibold tracking-tight text-foreground mb-2 mt-4" {...props} />
          ),
          p: ({ ...props }: any) => (
            <p className="mb-4 text-foreground/90 leading-relaxed" {...props} />
          ),
          ul: ({ ...props }: any) => (
            <ul className="list-disc list-outside space-y-2 mb-4 text-foreground ml-6" {...props} />
          ),
          ol: ({ ...props }: any) => (
            <ol className="list-decimal list-outside space-y-2 mb-4 text-foreground ml-6" {...props} />
          ),
          li: ({ ...props }: any) => (
            <li className="mb-1 text-foreground/90 leading-relaxed" {...props} />
          ),
          a: ({ ...props }: any) => (
            <a className="text-primary hover:underline font-medium" {...props} />
          ),
          blockquote: ({ ...props }: any) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4" {...props} />
          ),
          hr: ({ ...props }: any) => (
            <hr className="border-border my-8" {...props} />
          ),
          table: ({ ...props }: any) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-border rounded-lg" {...props} />
            </div>
          ),
          th: ({ ...props }: any) => (
            <th className="border border-border p-3 text-left bg-muted font-semibold text-foreground" {...props} />
          ),
          td: ({ ...props }: any) => (
            <td className="border border-border p-3 text-foreground/90" {...props} />
          ),
          strong: ({ ...props }: any) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
          em: ({ ...props }: any) => (
            <em className="italic text-foreground/90" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

