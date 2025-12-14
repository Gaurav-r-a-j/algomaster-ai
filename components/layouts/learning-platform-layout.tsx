"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { TOPICS, getModules } from "@/data/curriculum"
import {
  extractModuleNumber,
  isActivePath,
  removeModulePrefix,
} from "@/utils/common/path-utils"
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"

import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  ChevronRightIcon,
  Home01Icon,
  SearchIcon,
} from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { IconWrapper } from "@/components/common/icon-wrapper"

interface LearningPlatformLayoutProps {
  children: React.ReactNode
}

export function LearningPlatformLayout({
  children,
}: LearningPlatformLayoutProps) {
  const pathname = usePathname()
  const { completedTopics } = useProgress()
  const modules = getModules()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: string) => isActivePath(pathname, path)

  // Filter modules and topics based on search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return modules
    }
    const query = searchQuery.toLowerCase()
    return modules.filter((module) => module.toLowerCase().includes(query))
  }, [modules, searchQuery])

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return TOPICS
    }
    const query = searchQuery.toLowerCase()
    return TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.module.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <SidebarProvider>
      <Sidebar className="border-border border-r">
        <SidebarHeader className="border-border border-b px-4 py-4">
          <div className="mb-4 flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
              <IconWrapper
                icon={BookOpenIcon}
                size={20}
                className="text-primary-foreground"
              />
            </div>
            <Link
              href={ROUTES.HOME}
              className="text-foreground hover:text-primary text-lg font-bold tracking-tight transition-colors"
            >
              DSA Platform
            </Link>
          </div>
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
            {searchQuery.trim() ? (
              // Search Results
              <div className="space-y-4 p-2">
                {filteredModules.length > 0 && (
                  <SidebarGroup>
                    <SidebarGroupLabel>Modules</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {filteredModules.map((module) => {
                          const moduleTopics = TOPICS.filter(
                            (t) => t.module === module
                          )
                          const completedCount = moduleTopics.filter((t) =>
                            completedTopics.includes(t.id)
                          ).length
                          const moduleSlug = generateModuleSlug(module)
                          const modulePath = ROUTES.MODULE(moduleSlug)
                          const isModuleActive = isActive(modulePath)
                          const moduleNumber = extractModuleNumber(module)
                          const moduleTitle = removeModulePrefix(module)

                          return (
                            <SidebarMenuItem key={module}>
                              <SidebarMenuButton
                                asChild
                                isActive={isModuleActive}
                                tooltip={moduleTitle}
                              >
                                <Link href={modulePath}>
                                  <span className="text-muted-foreground font-mono text-xs">
                                    {moduleNumber}
                                  </span>
                                  <span className="truncate">
                                    {moduleTitle.slice(0, 20)}
                                    {moduleTitle.length > 20 && "..."}
                                  </span>
                                  {completedCount > 0 && (
                                    <Badge
                                      variant="secondary"
                                      className="ml-auto h-5 px-1.5 text-xs"
                                    >
                                      {completedCount}/{moduleTopics.length}
                                    </Badge>
                                  )}
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )}

                {filteredTopics.length > 0 && (
                  <SidebarGroup>
                    <SidebarGroupLabel>Topics</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {filteredTopics.slice(0, 10).map((topic) => {
                          const topicSlug = generateTopicSlug(topic.title)
                          const topicPath = ROUTES.TOPIC(topicSlug)
                          const isTopicActive = isActive(topicPath)
                          const isDone = completedTopics.includes(topic.id)

                          return (
                            <SidebarMenuItem key={topic.id}>
                              <SidebarMenuButton
                                asChild
                                isActive={isTopicActive}
                                tooltip={topic.title}
                              >
                                <Link href={topicPath}>
                                  {isDone && (
                                    <IconWrapper
                                      icon={CheckmarkCircleIcon}
                                      size={12}
                                      className="shrink-0 text-emerald-500"
                                    />
                                  )}
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
                )}

                {filteredModules.length === 0 &&
                  filteredTopics.length === 0 && (
                    <div className="text-muted-foreground p-4 text-center text-sm">
                      No results found
                    </div>
                  )}
              </div>
            ) : (
              // Normal Navigation
              <>
                <SidebarGroup>
                  <SidebarGroupLabel>Quick Links</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(ROUTES.HOME)}
                          tooltip="Home"
                        >
                          <Link href={ROUTES.HOME}>
                            <IconWrapper icon={Home01Icon} size={16} />
                            <span>Home</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(ROUTES.DASHBOARD)}
                          tooltip="Dashboard"
                        >
                          <Link href={ROUTES.DASHBOARD}>
                            <IconWrapper icon={BookOpenIcon} size={16} />
                            <span>Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <Separator />

                <SidebarGroup>
                  <SidebarGroupLabel>Modules</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {modules.map((module) => {
                        const moduleTopics = TOPICS.filter(
                          (t) => t.module === module
                        ).sort((a, b) => a.order - b.order)
                        const completedCount = moduleTopics.filter((t) =>
                          completedTopics.includes(t.id)
                        ).length
                        const moduleSlug = generateModuleSlug(module)
                        const modulePath = ROUTES.MODULE(moduleSlug)
                        const isModuleActive = isActive(modulePath)
                        const moduleNumber = extractModuleNumber(module)
                        const moduleTitle = removeModulePrefix(module)

                        // Check if any topic in this module is active
                        const hasActiveTopic = moduleTopics.some((topic) => {
                          const topicSlug = generateTopicSlug(topic.title)
                          const topicPath = ROUTES.TOPIC(topicSlug)
                          return isActive(topicPath)
                        })

                        // Default open if module is active or has active topic
                        const defaultOpen = isModuleActive || hasActiveTopic

                        return (
                          <Collapsible
                            key={module}
                            defaultOpen={defaultOpen}
                            className="group/collapsible"
                          >
                            <SidebarMenuItem>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                  isActive={isModuleActive || hasActiveTopic}
                                  tooltip={moduleTitle}
                                  className="w-full"
                                >
                                  <IconWrapper
                                    icon={ChevronRightIcon}
                                    size={14}
                                    className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                  />
                                  <span className="text-muted-foreground font-mono text-xs">
                                    {moduleNumber}
                                  </span>
                                  <span className="flex-1 truncate text-left">
                                    {moduleTitle}
                                  </span>
                                  {completedCount > 0 && (
                                    <Badge
                                      variant="secondary"
                                      className="ml-auto h-5 shrink-0 px-1.5 text-xs"
                                    >
                                      {completedCount}/{moduleTopics.length}
                                    </Badge>
                                  )}
                                </SidebarMenuButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <SidebarMenu className="mt-1 ml-2 space-y-0.5">
                                  {moduleTopics.map((topic) => {
                                    const topicSlug = generateTopicSlug(
                                      topic.title
                                    )
                                    const topicPath = ROUTES.TOPIC(topicSlug)
                                    const isTopicActive = isActive(topicPath)
                                    const isDone = completedTopics.includes(
                                      topic.id
                                    )

                                    return (
                                      <SidebarMenuItem key={topic.id}>
                                        <SidebarMenuButton
                                          asChild
                                          isActive={isTopicActive}
                                          tooltip={topic.title}
                                          size="sm"
                                          className="pl-8"
                                        >
                                          <Link href={topicPath}>
                                            {isDone && (
                                              <IconWrapper
                                                icon={CheckmarkCircleIcon}
                                                size={12}
                                                className="shrink-0 text-emerald-500"
                                              />
                                            )}
                                            <span className="truncate text-sm">
                                              {topic.title}
                                            </span>
                                          </Link>
                                        </SidebarMenuButton>
                                      </SidebarMenuItem>
                                    )
                                  })}
                                </SidebarMenu>
                              </CollapsibleContent>
                            </SidebarMenuItem>
                          </Collapsible>
                        )
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

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
                              const topic = TOPICS.find((t) => t.id === topicId)
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

        <SidebarFooter className="border-border border-t">
          <div className="px-2 py-4">
            <SidebarMenuButton asChild>
              <Link href={ROUTES.HOME}>
                <IconWrapper icon={Home01Icon} size={16} />
                <span>Back to Home</span>
              </Link>
            </SidebarMenuButton>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
