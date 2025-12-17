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
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-80 shrink-0 overflow-hidden border-l border-border/50 bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm">
      <div className="h-full overflow-y-auto px-6 py-10 space-y-8 custom-scrollbar">
        {/* Topic Details Section */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Topic Details
            </h3>
          </div>
          
          <div className="space-y-5">
            {/* Difficulty */}
            <Card className="border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Difficulty
                </p>
                <Badge
                  variant={getDifficultyVariant()}
                  className="w-full justify-center py-2.5 text-sm font-bold shadow-sm"
                >
                  {topic.difficulty || "Medium"}
                </Badge>
              </CardContent>
            </Card>

            {/* Complexity */}
            {(topic.complexity?.time && topic.complexity.time !== "N/A") || 
             (topic.complexity?.space && topic.complexity.space !== "N/A") ? (
              <Card className="border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                    Complexity
                  </p>
                  <div className="space-y-3">
                    {topic.complexity?.time && topic.complexity.time !== "N/A" && (
                      <div className="flex items-center gap-3.5 rounded-lg bg-primary/5 p-3 border border-primary/10">
                        <div className="shrink-0 rounded-lg bg-primary/15 p-2.5 shadow-sm">
                          <ClockIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                            Time
                          </p>
                          <p className="text-base font-mono font-bold text-foreground">
                            {topic.complexity.time}
                          </p>
                        </div>
                      </div>
                    )}
                    {topic.complexity?.space && topic.complexity.space !== "N/A" && (
                      <div className="flex items-center gap-3.5 rounded-lg bg-primary/5 p-3 border border-primary/10">
                        <div className="shrink-0 rounded-lg bg-primary/15 p-2.5 shadow-sm">
                          <CpuChipIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                            Space
                          </p>
                          <p className="text-base font-mono font-bold text-foreground">
                            {topic.complexity.space}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        {/* YouTube Video Section */}
        {videoId && (
          <>
            <Separator className="my-8" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-8 bg-primary rounded-full" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                    Learn More
                  </h3>
                </div>
                {hasMultipleLanguages && (
                  <Tabs value={videoLanguage} onValueChange={(v) => setVideoLanguage(v as "en" | "hi")} className="w-auto">
                    <TabsList className="h-7 bg-muted/50">
                      <TabsTrigger value="en" className="text-[10px] px-2.5 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">EN</TabsTrigger>
                      <TabsTrigger value="hi" className="text-[10px] px-2.5 py-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">HI</TabsTrigger>
                    </TabsList>
                  </Tabs>
                )}
              </div>
              <Card className="overflow-hidden border-border/60 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
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
        <Separator className="my-8" />
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-primary rounded-full" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
              Navigation
            </h3>
          </div>
          
          <div className="space-y-3">
            {prevTopic && (
              <Card className="border-border/60 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer group">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-0 hover:bg-transparent"
                  asChild
                >
                  <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                    <CardContent className="p-4 w-full">
                      <div className="flex items-center gap-3.5">
                        <div className="shrink-0 rounded-lg bg-muted/60 group-hover:bg-primary/10 p-2.5 transition-colors group-hover:-translate-x-1 transition-transform">
                          <IconWrapper 
                            icon={ArrowLeft01Icon} 
                            size={16} 
                            className="text-muted-foreground group-hover:text-primary transition-colors" 
                          />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wide">
                            Previous
                          </p>
                          <p className="text-sm font-bold truncate text-foreground leading-tight group-hover:text-primary transition-colors">
                            {prevTopic.title}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Button>
              </Card>
            )}

            {nextTopic && (
              <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-all hover:shadow-lg cursor-pointer group">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-0 hover:bg-transparent"
                  asChild
                >
                  <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                    <CardContent className="p-4 w-full">
                      <div className="flex items-center gap-3.5">
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-xs font-semibold text-primary/80 mb-1 uppercase tracking-wide">
                            Next
                          </p>
                          <p className="text-sm font-bold truncate text-primary leading-tight">
                            {nextTopic.title}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-lg bg-primary/20 group-hover:bg-primary/30 p-2.5 transition-colors group-hover:translate-x-1 transition-transform">
                          <IconWrapper 
                            icon={ArrowRight01Icon} 
                            size={16} 
                            className="text-primary" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Button>
              </Card>
            )}

            {!prevTopic && !nextTopic && (
              <Card className="border-dashed border-border/50 bg-muted/20">
                <CardContent className="p-6 text-center">
                  <p className="text-xs font-medium text-muted-foreground">
                    No navigation available
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}

