"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { ExternalLinkIcon } from "lucide-react"
import { ClockIcon, CpuChipIcon } from "@heroicons/react/24/outline"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Topic } from "@/types/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"

interface TopicSidebarProps {
  topic: Topic
  prevTopic: Topic | null
  nextTopic: Topic | null
}

export function TopicSidebar({ topic, prevTopic, nextTopic }: TopicSidebarProps) {
  const getDifficultyVariant = () => {
    if (topic.difficulty === "Easy") return "default"
    if (topic.difficulty === "Hard") return "destructive"
    return "secondary"
  }

  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-80 shrink-0 overflow-hidden border-l border-border/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="h-full overflow-y-auto px-5 py-8 space-y-6 custom-scrollbar">
        {/* Topic Details Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Topic Details
          </h3>
          
          <div className="space-y-4">
            {/* Difficulty */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2.5 uppercase tracking-wide">
                Difficulty
              </p>
              <Badge
                variant={getDifficultyVariant()}
                className="w-full justify-center py-2 text-sm font-semibold"
              >
                {topic.difficulty || "Medium"}
              </Badge>
            </div>

            {/* Complexity */}
            {(topic.complexity?.time && topic.complexity.time !== "N/A") || 
             (topic.complexity?.space && topic.complexity.space !== "N/A") ? (
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Complexity
                </p>
                <div className="space-y-3">
                  {topic.complexity?.time && topic.complexity.time !== "N/A" && (
                    <Card className="border-border/60 transition-colors hover:border-primary/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3.5">
                          <div className="mt-0.5 shrink-0 rounded-lg bg-primary/10 p-2">
                            <ClockIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                              Time
                            </p>
                            <p className="text-base font-mono font-bold text-foreground">
                              {topic.complexity.time}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  {topic.complexity?.space && topic.complexity.space !== "N/A" && (
                    <Card className="border-border/60 transition-colors hover:border-primary/30">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3.5">
                          <div className="mt-0.5 shrink-0 rounded-lg bg-primary/10 p-2">
                            <CpuChipIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
                              Space
                            </p>
                            <p className="text-base font-mono font-bold text-foreground">
                              {topic.complexity.space}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* YouTube Link Section */}
        {topic.youtubeLink && (
          <>
            <Separator className="my-6" />
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Learn More
              </h3>
              <Button
                variant="outline"
                className="w-full justify-between group h-auto py-3.5 border-2 transition-all hover:border-primary/50 hover:bg-primary/5"
                asChild
              >
                <Link
                  href={topic.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center gap-3">
                    <div className="rounded-lg bg-red-500/10 p-2">
                      <svg
                        className="h-5 w-5 text-red-500 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-sm">Watch Tutorial</span>
                  </span>
                  <ExternalLinkIcon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                </Link>
              </Button>
            </div>
          </>
        )}

        {/* Navigation Section */}
        <Separator className="my-6" />
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Navigation
          </h3>
          
          <div className="space-y-3">
            {prevTopic && (
              <Button
                variant="outline"
                className="w-full justify-start group h-auto py-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                asChild
              >
                <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                  <div className="mr-3 shrink-0 rounded-lg bg-muted p-2 transition-transform group-hover:-translate-x-1">
                    <IconWrapper 
                      icon={ArrowLeft01Icon} 
                      size={16} 
                      className="text-foreground" 
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide">
                      Previous
                    </p>
                    <p className="text-sm font-bold truncate text-foreground leading-tight">
                      {prevTopic.title}
                    </p>
                  </div>
                </Link>
              </Button>
            )}

            {nextTopic && (
              <Button
                variant="default"
                className="w-full justify-start group h-auto py-4 transition-all hover:scale-[1.01]"
                asChild
              >
                <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-medium text-primary-foreground/80 mb-1 uppercase tracking-wide">
                      Next
                    </p>
                    <p className="text-sm font-bold truncate text-primary-foreground leading-tight">
                      {nextTopic.title}
                    </p>
                  </div>
                  <div className="ml-3 shrink-0 rounded-lg bg-primary-foreground/20 p-2 transition-transform group-hover:translate-x-1">
                    <IconWrapper 
                      icon={ArrowRight01Icon} 
                      size={16} 
                      className="text-primary-foreground" 
                    />
                  </div>
                </Link>
              </Button>
            )}

            {!prevTopic && !nextTopic && (
              <div className="rounded-lg border border-dashed border-border/50 bg-muted/30 p-6 text-center">
                <p className="text-xs font-medium text-muted-foreground">
                  No navigation available
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

