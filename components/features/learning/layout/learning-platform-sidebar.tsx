"use client"

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

import { BookOpenIcon, CheckmarkCircleIcon, Home01Icon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface LearningPlatformSidebarProps {
  onNavigate?: () => void
}

export function LearningPlatformSidebar({
  onNavigate,
}: LearningPlatformSidebarProps) {
  const pathname = usePathname()
  const { completedTopics } = useProgress()
  const modules = getModules()

  const isActive = (path: string) => isActivePath(pathname, path)

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-6 p-4">
        {/* Quick Links */}
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
                  <Link href={ROUTES.HOME} onClick={onNavigate}>
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
                  <Link href={ROUTES.DASHBOARD} onClick={onNavigate}>
                    <IconWrapper icon={BookOpenIcon} size={16} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator />

        {/* Modules */}
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => {
                const moduleTopics = TOPICS.filter((t) => t.module === module)
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
                      <Link href={modulePath} onClick={onNavigate}>
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

        {/* Completed Topics */}
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
                      const topicPath = ROUTES.TOPIC(topic.categoryId || "dsa", topicSlug)
                      return (
                        <SidebarMenuItem key={topicId}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive(topicPath)}
                            tooltip={topic.title}
                          >
                            <Link href={topicPath} onClick={onNavigate}>
                              <IconWrapper
                                icon={CheckmarkCircleIcon}
                                size={12}
                                className="shrink-0 text-emerald-500"
                              />
                              <span className="truncate">{topic.title}</span>
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
      </div>
    </ScrollArea>
  )
}
