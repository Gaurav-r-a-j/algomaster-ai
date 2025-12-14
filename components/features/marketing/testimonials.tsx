"use client";

import { IconWrapper } from "@/components/common/icon-wrapper";
import { QuoteIcon } from "@/lib/icons";

const testimonials = [
  {
    quote:
      "This platform helped me ace my technical interviews. The visualizations made complex algorithms easy to understand.",
    author: "Sarah Jenkins",
    role: "Software Engineer",
  },
  {
    quote:
      "The AI-powered explanations are a game changer. I finally understand how recursion works!",
    author: "Michael Chen",
    role: "Computer Science Student",
  },
  {
    quote:
      "Best DSA learning platform I've used. The practice problems are well-curated and the interface is beautiful.",
    author: "Jessica Alverez",
    role: "Full Stack Developer",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Students & Developers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners who have improved their DSA skills and landed their dream jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-muted/50 p-8 rounded-2xl border border-border relative"
            >
              <IconWrapper
                icon={QuoteIcon}
                size={40}
                className="text-primary/20 absolute top-6 left-6"
              />
              <p className="text-foreground/80 italic mb-6 mt-8 relative z-10 leading-relaxed">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

