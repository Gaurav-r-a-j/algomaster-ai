"use client"

import { useState } from "react"
import Link from "next/link"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"
import { ROUTES } from "@/constants/routes"
import { ClockIcon, CpuChipIcon } from "@heroicons/react/24/outline"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Topic } from "@/types/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"

interface TopicSidebarProps {
  topic: Topic
  prevTopic: Topic | null
  nextTopic: Topic | null
}

// Extract YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : null
}

// Get YouTube link based on language preference
function getYouTubeLink(topic: Topic, language: "en" | "hi" = "en"): string | null {
  if (!topic.youtubeLink) return null
  
  if (typeof topic.youtubeLink === "string") {
    return topic.youtubeLink
  }
  
  if (typeof topic.youtubeLink === "object") {
    return topic.youtubeLink[language] || topic.youtubeLink.en || null
  }
  
  return null
}

export function TopicSidebar({ topic, prevTopic, nextTopic }: TopicSidebarProps) {
  const [videoLanguage, setVideoLanguage] = useState<"en" | "hi">("en")
  
  const getDifficultyVariant = () => {
    if (topic.difficulty === "Easy") return "default"
    if (topic.difficulty === "Hard") return "destructive"
    return "secondary"
  }

  const youtubeLink = getYouTubeLink(topic, videoLanguage)
  const videoId = youtubeLink ? getYouTubeId(youtubeLink) : null
  const hasMultipleLanguages = typeof topic.youtubeLink === "object" && 
    topic.youtubeLink.en && topic.youtubeLink.hi

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

        {/* YouTube Video Section */}
        {videoId && (
          <>
            <Separator className="my-6" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Learn More
                </h3>
                {hasMultipleLanguages && (
                  <Tabs value={videoLanguage} onValueChange={(v) => setVideoLanguage(v as "en" | "hi")} className="w-auto">
                    <TabsList className="h-7">
                      <TabsTrigger value="en" className="text-[10px] px-2 py-1">EN</TabsTrigger>
                      <TabsTrigger value="hi" className="text-[10px] px-2 py-1">HI</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>
              <Card className="overflow-hidden border-border/60">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <LiteYouTubeEmbed
                      id={videoId}
                      title={`${topic.title} Tutorial`}
                      wrapperClass="yt-lite"
                    />
                  </div>
                </CardContent>
              </Card>
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

