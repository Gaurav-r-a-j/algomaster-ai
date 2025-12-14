"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TableOfContentsProps {
  content: string; // Markdown content
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Basic markdown parsing for headers
    // Limitation: This runs client side. Ideally we parse this server-side with remark-slug
    // But for now, we'll parse the raw string.
    const lines = content.split("\n");
    const extractedItems: TocItem[] = [];
    
    // Regex for # Heading, ## Heading, ### Heading
    const headingRegex = /^(#{2,3})\s+(.*)$/;

    lines.forEach((line) => {
      const match = line.match(headingRegex);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
          
        extractedItems.push({ id, text, level });
      }
    });

    setItems(extractedItems);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm">On This Page</h3>
      <div className="flex flex-col space-y-2 text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block transition-colors hover:text-foreground line-clamp-1",
              item.level === 3 ? "pl-4" : "",
              activeId === item.id
                ? "font-medium text-primary"
                : "text-muted-foreground"
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({
                behavior: "smooth",
              });
              setActiveId(item.id);
            }}
          >
             {activeId === item.id && (
                <motion.span
                    layoutId="toc-indicator"
                    className="absolute left-0 w-[2px] h-4 bg-primary rounded-full -ml-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
             )}
            {item.text}
          </a>
        ))}
      </div>
    </div>
  );
}
