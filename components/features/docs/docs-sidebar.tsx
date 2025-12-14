"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

import { getModules, getTopicsByModule } from "@/data/curriculum";
import { generateTopicSlug } from "@/utils/common/slug";
import { APP_CONFIG } from "@/config/app";

export function DocsSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const modules = getModules();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpenIcon className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">{APP_CONFIG.name}</span>
                  <span className="text-xs text-muted-foreground">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Curriculum</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((moduleName) => {
                const topics = getTopicsByModule(moduleName);
                // "Module 1: Foundations" -> "Foundations" for cleaner display potentially, 
                // but let's keep full name for now or parse it.
                // Splitting "Module X: Name"
                const shortName = moduleName.split(": ")[1] || moduleName;
                const moduleNumber = moduleName.split(":")[0];

                return (
                  <Collapsible
                    key={moduleName}
                    defaultOpen={true}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={moduleName}>
                          <span className="font-medium">{moduleNumber}</span>
                          <span className="truncate">{shortName}</span>
                          <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {topics.map((topic) => {
                            const slug = generateTopicSlug(topic.title);
                            const href = `/docs/${slug}`;
                            const isActive = pathname === href;

                            return (
                              <SidebarMenuSubItem key={topic.id}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive}
                                >
                                  <Link href={href}>
                                    <span>{topic.title}</span>
                                    {topic.difficulty === "Hard" && (
                                      <span className="ml-auto text-[10px] font-bold text-destructive">H</span>
                                    )}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
