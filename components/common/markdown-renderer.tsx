"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// MarkdownRenderer - Component to render markdown content with syntax highlighting
// Uses remark-gfm for GitHub flavored markdown
// Uses rehype-highlight for syntax highlighting (client-compatible)
// Uses rehype-slug and rehype-autolink-headings for heading links
// Example: <MarkdownRenderer content={markdownContent} />
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none w-full ${className || ""}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
              },
            },
          ],
          rehypeHighlight,
        ]}
        components={{
          h1: ({ ...props }: any) => (
            <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-6 mt-0 pb-4 border-b border-border scroll-mt-20" {...props} />
          ),
          h2: ({ ...props }: any) => (
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-4 mt-8 pt-6 border-t border-border first:border-t-0 first:pt-0 scroll-mt-20" {...props} />
          ),
          h3: ({ ...props }: any) => (
            <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-3 mt-6 scroll-mt-20" {...props} />
          ),
          h4: ({ ...props }: any) => (
            <h4 className="text-xl font-semibold tracking-tight text-foreground mb-2 mt-5 scroll-mt-20" {...props} />
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
            <li className="mb-1.5 text-foreground/90 leading-relaxed" {...props} />
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
          pre: ({ children, ...props }: any) => {
            return (
              <pre className="bg-muted border border-border rounded-lg overflow-x-auto my-4 p-4" {...props}>
                {children}
              </pre>
            );
          },
          code: ({ className, children, ...props }: any) => {
            const isInline = !className || !className.includes("language-");
            if (isInline) {
              return (
                <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props}>
                  {children}
                </code>
              );
            }
            return <code className={className} {...props}>{children}</code>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
