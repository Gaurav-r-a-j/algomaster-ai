"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { isActivePath } from "@/utils/common/path-utils"
import { generateTopicSlug } from "@/utils/common/slug"

import {
  CheckmarkCircleIcon,
  SearchIcon,
} from "@/lib/icons"
import { useCurriculumSearch } from "@/hooks/curriculum"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Logo } from "@/components/common/logo"

import { SidebarModuleList } from "./sidebar/sidebar-module-list"
import { SidebarSearchResults } from "./sidebar/sidebar-search-results"

interface LearningPlatformLayoutProps {
  children: React.ReactNode
}

export function LearningPlatformLayout({
  children,
}: LearningPlatformLayoutProps) {
  const pathname = usePathname()
  const { completedTopics } = useProgress()
  const {
    searchQuery,
    setSearchQuery,
    filteredModules,
    filteredTopics,
    modules,
    topics,
    isLoading,
  } = useCurriculumSearch()

  const isActive = (path: string) => isActivePath(pathname, path)

  return (
    <SidebarProvider>
      <Sidebar className="border-border border-r ml-2">
        <SidebarHeader className="border-border border-b px-5 py-5">
          <Link
            href={ROUTES.HOME}
            className="mb-5 flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <Logo className="text-lg" />
          </Link>
          <div className="relative">
            <IconWrapper
              icon={SearchIcon}
              size={16}
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
            />
            <Input
              type="search"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/50 border-border focus:bg-background h-9 pl-9 text-sm"
            />
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="flex-1">
            {isLoading ? (
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <div className="space-y-1">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <div className="space-y-1">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </div>
              </div>
            ) : searchQuery.trim() ? (
              <SidebarSearchResults
                filteredModules={filteredModules}
                filteredTopics={filteredTopics}
                allTopics={topics}
                completedTopics={completedTopics}
                isActive={isActive}
              />
            ) : (
              // Normal Navigation
              <>
                <SidebarModuleList
                  modules={modules}
                  allTopics={topics}
                  completedTopics={completedTopics}
                  isActive={isActive}
                />

                {completedTopics.length > 0 && (
                  <>
                    <Separator />
                    <SidebarGroup>
                      <SidebarGroupLabel className="flex items-center gap-2">
                        <IconWrapper icon={CheckmarkCircleIcon} size={12} />
                        Completed
                      </SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {completedTopics
                            .slice(-5)
                            .reverse()
                            .map((topicId) => {
                              const topic = topics.find((t) => t.id === topicId)
                              if (!topic) {
                                return null
                              }
                              const topicSlug = generateTopicSlug(topic.title)
                              const topicPath = ROUTES.TOPIC(topicSlug)
                              return (
                                <SidebarMenuItem key={topicId}>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={isActive(topicPath)}
                                    tooltip={topic.title}
                                  >
                                    <Link href={topicPath}>
                                      <IconWrapper
                                        icon={CheckmarkCircleIcon}
                                        size={12}
                                        className="shrink-0 text-emerald-500"
                                      />
                                      <span className="truncate">
                                        {topic.title}
                                      </span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuItem>
                              )
                            })}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </>
                )}
              </>
            )}
          </ScrollArea>
        </SidebarContent>

      </Sidebar>

      <SidebarInset className="relative h-svh overflow-hidden">
        {/* Subtle gradient background */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.02]" />
        <main className="relative flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
