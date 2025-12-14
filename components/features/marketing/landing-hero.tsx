"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { HeroArrowRightIcon, SparklesIcon } from "@/lib/icons";
import { getFirstModuleUrl, getFirstTopicUrl } from "@/utils/curriculum-helpers";


import { motion } from "motion/react";

export function LandingHero() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden bg-background border-b border-border">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-transparent to-background/50 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Badge
            variant="secondary"
            className="mb-8 px-4 py-1.5 rounded-full text-sm font-medium border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
            <IconWrapper icon={SparklesIcon} size={14} className="mr-1.5 text-primary" />
            <span className="text-primary/90">AI-Powered Learning Platform</span>
            </Badge>
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-8 leading-[1.1]"
        >
          Master Data Structures <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-purple-600 animate-gradient-x">
            & Algorithms
          </span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Learn DSA with interactive visualizations, solve practice problems, and get
          AI-powered explanations. From beginner to interview-ready in weeks, not months.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
            <Link href={getFirstTopicUrl()}>
              Start Learning Now
              <HeroArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-14 px-10 rounded-full text-lg w-full sm:w-auto bg-background/50 backdrop-blur-sm hover:bg-muted border-2 hover:scale-105 transition-all duration-300"
          >
            <Link href={getFirstModuleUrl()}>Browse Topics</Link>
          </Button>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border/40 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-muted-foreground grayscale opacity-70"
        >
            {/* Simple Trust Signals */}
          <div className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Trusted by 1000+ Students
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-blue-500" /> Interactive Visualizers
          </div>
          <div className="text-sm font-semibold uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-purple-500" /> AI Assistance
          </div>
        </motion.div>
      </div>
    </section>
  );
}

