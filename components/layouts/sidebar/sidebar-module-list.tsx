import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import {
  extractModuleNumber,
  removeModulePrefix,
} from "@/utils/common/path-utils"
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"

import { Topic } from "@/types/curriculum"
import { CheckmarkCircleIcon, ChevronRightIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface SidebarModuleListProps {
  modules: string[]
  allTopics: Topic[]
  completedTopics: string[]
  isActive: (path: string) => boolean
}

export function SidebarModuleList({
  modules,
  allTopics,
  completedTopics,
  isActive,
}: SidebarModuleListProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {modules.map((module) => {
            const moduleTopics = allTopics
              .filter((t) => t.module === module)
              .sort((a, b) => a.order - b.order)
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
  )
}
