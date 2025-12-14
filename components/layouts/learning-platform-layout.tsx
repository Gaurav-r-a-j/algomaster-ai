"use client";

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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { useProgress } from "@/context/progress-context";
import { TOPICS, getModules } from "@/data/curriculum";
import { ROUTES } from "@/constants/routes";
import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  Home01Icon,
} from "@/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LearningPlatformLayoutProps {
  children: React.ReactNode;
}

export function LearningPlatformLayout({
  children,
}: LearningPlatformLayoutProps) {
  const pathname = usePathname();
  const { completedTopics, isCompleted } = useProgress();
  const modules = getModules();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <IconWrapper icon={BookOpenIcon} size={20} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg tracking-tight">DSA Platform</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea className="flex-1">
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
                      isActive={isActive(ROUTES.HOME)}
                      tooltip="Home"
                    >
                      <Link href={ROUTES.HOME}>
                        <IconWrapper icon={BookOpenIcon} size={16} />
                        <span>Home</span>
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
                    const moduleTopics = TOPICS.filter((t) => t.module === module);
                    const completedCount = moduleTopics.filter((t) =>
                      completedTopics.includes(t.id)
                    ).length;
                    const moduleSlug = module
                      .toLowerCase()
                      .replace(/^\d+\.\s*/, "")
                      .replace(/\s+/g, "-");
                    const modulePath = ROUTES.MODULE(moduleSlug);
                    const isModuleActive = isActive(modulePath);

                    return (
                      <SidebarMenuItem key={module}>
                        <SidebarMenuButton
                          asChild
                          isActive={isModuleActive}
                          tooltip={module.replace(/^\d+\.\s*/, "")}
                        >
                          <Link href={modulePath}>
                            <span className="text-xs font-mono text-muted-foreground">
                              {module.match(/^\d+/)?.[0] || ""}
                            </span>
                            <span className="truncate">
                              {module.replace(/^\d+\.\s*/, "").slice(0, 20)}
                              {module.replace(/^\d+\.\s*/, "").length > 20 && "..."}
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
                    );
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
                          const topic = TOPICS.find((t) => t.id === topicId);
                          if (!topic) {return null;}
                          const topic = TOPICS.find((t) => t.id === topicId);
                          if (!topic) {return null;}
                          const topicSlug = topic.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "");
                          const topicPath = ROUTES.TOPIC(topicSlug);
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
                                    className="text-emerald-500"
                                  />
                                  <span className="truncate">{topic.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="border-t border-border">
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
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex-1" />
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
