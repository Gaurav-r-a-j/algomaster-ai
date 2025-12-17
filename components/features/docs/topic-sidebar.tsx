"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { ExternalLinkIcon } from "lucide-react"
import { ClockIcon, CpuChipIcon } from "@heroicons/react/24/outline"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Topic } from "@/types/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"

interface TopicSidebarProps {
  topic: Topic
  prevTopic: Topic | null
  nextTopic: Topic | null
}

export function TopicSidebar({ topic, prevTopic, nextTopic }: TopicSidebarProps) {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-80 shrink-0 overflow-hidden border-l-2 border-border bg-background">
      <div className="h-full overflow-y-auto px-6 py-10 space-y-8">
        <div className="space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Topic Details
        </h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Difficulty</p>
            <Badge
              variant={topic.difficulty === "Hard" ? "destructive" : "secondary"}
              className="w-full justify-center"
            >
              {topic.difficulty || "Medium"}
            </Badge>
          </div>

          {(topic.complexity?.time && topic.complexity.time !== "N/A") || 
           (topic.complexity?.space && topic.complexity.space !== "N/A") ? (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-3">Complexity</p>
              <div className="space-y-2.5">
                {topic.complexity?.time && topic.complexity.time !== "N/A" && (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5">
                    <ClockIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Time</p>
                      <p className="text-sm font-mono font-semibold text-foreground">
                        {topic.complexity.time}
                      </p>
                    </div>
                  </div>
                )}
                {topic.complexity?.space && topic.complexity.space !== "N/A" && (
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3.5 py-2.5">
                    <CpuChipIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Space</p>
                      <p className="text-sm font-mono font-semibold text-foreground">
                        {topic.complexity.space}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {((topic as any).youtubeLink || 
        (topic.complexity?.time && topic.complexity.time !== "N/A") || 
        (topic.complexity?.space && topic.complexity.space !== "N/A")) && (
        <Separator />
      )}

      {topic.youtubeLink && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Learn More
          </h3>
          <Button
            variant="outline"
            className="w-full justify-between group h-auto py-3"
            asChild
          >
            <Link
              href={topic.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-2.5">
                <svg
                  className="h-5 w-5 text-red-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span className="font-medium">Watch Tutorial</span>
              </span>
              <ExternalLinkIcon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          </Button>
        </div>
      )}

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Navigation
        </h3>
        
        <div className="space-y-2.5">
          {prevTopic && (
            <Button
              variant="outline"
              className="w-full justify-start group h-auto py-3"
              asChild
            >
              <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                <IconWrapper 
                  icon={ArrowLeft01Icon} 
                  size={16} 
                  className="mr-3 group-hover:-translate-x-0.5 transition-transform shrink-0" 
                />
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">Previous</p>
                  <p className="text-sm font-semibold truncate text-foreground">{prevTopic.title}</p>
                </div>
              </Link>
            </Button>
          )}

          {nextTopic && (
            <Button
              variant="default"
              className="w-full justify-start group h-auto py-3"
              asChild
            >
              <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-xs text-white/80 mb-0.5">Next</p>
                  <p className="text-sm font-semibold truncate">{nextTopic.title}</p>
                </div>
                <IconWrapper 
                  icon={ArrowRight01Icon} 
                  size={16} 
                  className="ml-3 group-hover:translate-x-0.5 transition-transform shrink-0" 
                />
              </Link>
            </Button>
          )}

          {!prevTopic && !nextTopic && (
            <p className="text-xs text-muted-foreground text-center py-2">
              No navigation available
            </p>
          )}
        </div>
      </div>
      </div>
    </aside>
  )
}

