"use client"

import { QuoteIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

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
]

export function Testimonials() {
  return (
    <section className="bg-background border-border border-b py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Trusted by Students & Developers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Join thousands of learners who have improved their DSA skills and
            landed their dream jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-muted/50 border-border relative rounded-2xl border p-8"
            >
              <IconWrapper
                icon={QuoteIcon}
                size={40}
                className="text-primary/20 absolute top-6 left-6"
              />
              <p className="text-foreground/80 relative z-10 mt-8 mb-6 leading-relaxed italic">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="text-foreground text-sm font-bold">
                    {t.author}
                  </div>
                  <div className="text-muted-foreground text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
