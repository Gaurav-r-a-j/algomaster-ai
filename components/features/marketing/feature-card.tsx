"use client"

import type { ComponentType, SVGProps } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { BookOpenIcon, CodeIcon, PlayIcon, SparklesIcon } from "@/lib/icons"

// Type for Huge Icons (IconSvgObject) - matches @hugeicons/core-free-icons
type IconSvgObject = [string, Record<string, string | number>][] | unknown

// Union type for both React components and Huge Icons
type IconType = ComponentType<SVGProps<SVGSVGElement>> | IconSvgObject

interface Feature {
  icon: IconType
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: PlayIcon,
    title: "Interactive Visualizations",
    description: "Step-by-step algorithm visualizations with D3.js and React Flow. Watch algorithms execute in real-time with beautiful animations.",
  },
  {
    icon: CodeIcon,
    title: "Multi-Language Support",
    description: "Every code example available in JavaScript, Python, Java, and C++. Learn concepts in your preferred language.",
  },
  {
    icon: BookOpenIcon,
    title: "Structured Learning Path",
    description: "Follow a carefully curated curriculum from basics to advanced topics. Track your progress as you learn.",
  },
  {
    icon: SparklesIcon,
    title: "Knowledge Checks",
    description: "Test your understanding with quizzes for each topic. AI-powered question generation available.",
  },
]

interface FeatureCardProps {
  icon: IconType
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <IconWrapper
            icon={icon}
            size={24}
            className="text-primary"
          />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

export function FeaturesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {features.map((feature, idx) => (
        <FeatureCard
          key={idx}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  )
}

