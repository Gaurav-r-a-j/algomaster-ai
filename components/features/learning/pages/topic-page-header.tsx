"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { removeModulePrefix } from "@/utils/common/path-utils"
import { generateModuleSlug } from "@/utils/common/slug"
import { motion } from "motion/react"
import { slideDown, transitions } from "@/lib/animations"
import { ShareIcon, UserIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IconWrapper } from "@/components/common/icon-wrapper"
import type { Topic } from "@/types/curriculum"

interface TopicPageHeaderProps {
  topic: Topic
}

export function TopicPageHeader({ topic }: TopicPageHeaderProps) {
  const moduleSlug = generateModuleSlug(topic.module)

  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={slideDown}
      transition={transitions.smooth}
      className="bg-background/95 supports-backdrop-filter:bg-background/80 border-border/40 sticky top-0 z-50 shrink-0 border-b backdrop-blur-md"
    >
      <div className="h-full w-full px-4 sm:px-6 lg:px-8">
        {/* SEO Breadcrumbs */}
        <Breadcrumb className="sr-only">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={ROUTES.HOME}>Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={ROUTES.MODULE(moduleSlug)}>
                  {removeModulePrefix(topic.module)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{topic.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Compact Header */}
        <div className="flex min-h-[60px] items-center justify-between gap-4 py-3">
          {/* Left: Title */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                <span className="text-primary font-mono text-sm font-bold">
                  #{topic.order + 1}
                </span>
              </div>
              <h1 className="text-foreground truncate text-lg font-bold tracking-tight md:text-xl">
                {topic.title}
              </h1>
              <div className="ml-2 hidden items-center gap-1.5 sm:flex">
                <Badge
                  variant={
                    topic.difficulty === "Easy"
                      ? "default"
                      : topic.difficulty === "Hard"
                        ? "destructive"
                        : "secondary"
                  }
                  className="h-5 px-1.5 py-0 text-[10px] font-semibold uppercase"
                >
                  {topic.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className="h-5 px-1.5 py-0 font-mono text-[10px]"
                >
                  {topic.complexity.time}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 sm:flex">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-border/60 hover:bg-muted/50 hover:border-primary/50 transition-all"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: topic.title,
                      text: `Learn ${topic.title} on AlgoMaster AI`,
                      url: window.location.href,
                    }).catch(() => {})
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                  }
                }}
                title="Share this topic"
              >
                <IconWrapper icon={ShareIcon} size={16} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-border/60 hover:bg-muted/50 hover:border-primary/50 transition-all"
                asChild
                title="Dashboard"
              >
                <Link href={ROUTES.DASHBOARD}>
                  <IconWrapper icon={UserIcon} size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

