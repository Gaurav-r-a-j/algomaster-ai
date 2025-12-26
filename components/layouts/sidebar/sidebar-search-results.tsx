import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import {
  extractModuleNumber,
  removeModulePrefix,
} from "@/utils/common/path-utils"
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"

import { Topic } from "@/types/curriculum"
import { CheckmarkCircleIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface SidebarSearchResultsProps {
  filteredModules: string[]
  filteredTopics: Topic[]
  allTopics: Topic[]
  completedTopics: string[]
  isActive: (path: string) => boolean
}

export function SidebarSearchResults({
  filteredModules,
  filteredTopics,
  allTopics,
  completedTopics,
  isActive,
}: SidebarSearchResultsProps) {
  return (
    <div className="space-y-4 p-2">
      {filteredModules.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredModules.map((module) => {
                const moduleTopics = allTopics.filter(
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
                const topicPath = ROUTES.TOPIC(topic.categoryId || "dsa", topicSlug)
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
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {filteredModules.length === 0 && filteredTopics.length === 0 && (
        <div className="text-muted-foreground p-4 text-center text-sm">
          No results found
        </div>
      )}
    </div>
  )
}
