"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { useProgress } from "@/context/progress-context";
import { TOPICS, getModules } from "@/data/curriculum";
import { ROUTES } from "@/constants/routes";
import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  Home01Icon,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

interface LearningPlatformSidebarProps {
  onNavigate?: () => void;
}

export function LearningPlatformSidebar({
  onNavigate,
}: LearningPlatformSidebarProps) {
  const pathname = usePathname();
  const { completedTopics, isCompleted } = useProgress();
  const modules = getModules();

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div className="flex h-full flex-col border-r border-border bg-background">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link
          href={ROUTES.HOME}
          className="font-bold text-lg tracking-tight text-foreground hover:text-primary transition-colors"
          onClick={onNavigate}
        >
          DSA Platform
        </Link>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Quick Links
            </h3>
            <nav className="space-y-1">
              <Link
                href={ROUTES.HOME}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(ROUTES.HOME)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={onNavigate}
              >
                <IconWrapper icon={Home01Icon} size={16} />
                Home
              </Link>
              <Link
                href={ROUTES.HOME}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(ROUTES.HOME)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
                onClick={onNavigate}
              >
                <IconWrapper icon={BookOpenIcon} size={16} />
                Home
              </Link>
            </nav>
          </div>

          <Separator />

          {/* Modules */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Modules
            </h3>
            <nav className="space-y-1">
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
                  <Link
                    key={module}
                    href={modulePath}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors group",
                      isModuleActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={onNavigate}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground">
                        {module.match(/^\d+/)?.[0] || ""}
                      </span>
                      <span>
                        {module.replace(/^\d+\.\s*/, "").slice(0, 20)}
                        {module.replace(/^\d+\.\s*/, "").length > 20 && "..."}
                      </span>
                    </span>
                    {completedCount > 0 && (
                      <Badge
                        variant="secondary"
                        className="ml-2 h-5 px-1.5 text-xs"
                      >
                        {completedCount}/{moduleTopics.length}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <Separator />

          {/* Completed Topics */}
          {completedTopics.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <IconWrapper icon={CheckmarkCircleIcon} size={12} />
                Completed
              </h3>
              <nav className="space-y-1">
                {completedTopics
                  .slice(-5)
                  .reverse()
                        .map((topicId) => {
                          const topic = TOPICS.find((t) => t.id === topicId);
                          if (!topic) {return null;}
                          const topicSlug = topic.title
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-+|-+$/g, "");
                          const topicPath = ROUTES.TOPIC(topicSlug);
                    return (
                      <Link
                        key={topicId}
                        href={topicPath}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive(topicPath)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                        onClick={onNavigate}
                      >
                        <IconWrapper
                          icon={CheckmarkCircleIcon}
                          size={12}
                          className="text-emerald-500"
                        />
                        <span className="truncate">{topic.title}</span>
                      </Link>
                    );
                  })}
              </nav>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Back to Home - Fixed at Bottom */}
      <div className="border-t border-border p-4">
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={onNavigate}
        >
          <IconWrapper icon={Home01Icon} size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

