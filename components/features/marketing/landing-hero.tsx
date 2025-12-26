"use client"

import Link from "next/link"
import { getFirstModuleUrl, getFirstTopicUrl } from "@/utils/curriculum"
import { motion } from "motion/react"

import { HeroArrowRightIcon, SparklesIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"

export function LandingHero() {
  return (
    <section className="bg-background relative overflow-hidden px-4 pt-32 pb-24 sm:px-6">
      {/* Minimal Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial Gradient overlay */}
      <div className="from-background to-background/50 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b via-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="border-border bg-muted/30 mb-8 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground transition-none"
          >
            AI-Powered Platform
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-foreground mb-8 text-5xl leading-[1.1] font-black tracking-tighter md:text-7xl"
        >
          Master Data Structures <br />
          & Algorithms
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground mx-auto mb-10 max-w-3xl text-xl leading-relaxed font-light md:text-2xl"
        >
          Learn DSA with interactive visualizations, solve practice problems,
          and get AI-powered explanations. From beginner to interview-ready in
          weeks, not months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-14 w-full rounded-full px-10 text-lg transition-all duration-300 sm:w-auto font-bold"
          >
            <Link href={getFirstTopicUrl()}>
              Start Learning Now
              <HeroArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="bg-background/50 hover:bg-muted h-14 w-full rounded-full border-2 px-10 text-lg backdrop-blur-sm transition-all duration-300 sm:w-auto font-bold text-foreground"
          >
            <Link href={getFirstModuleUrl()}>Browse Topics</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="border-border/40 text-muted-foreground mt-16 flex flex-wrap items-center justify-center gap-8 border-t pt-8 opacity-70 grayscale md:gap-16"
        >
          {/* Simple Trust Signals */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" /> Trusted by
            1000+ Students
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" /> Interactive
            Visualizers
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-foreground/20" /> AI
            Assistance
          </div>
        </motion.div>
      </div>
    </section>
  )
}
