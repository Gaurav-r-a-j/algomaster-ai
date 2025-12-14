"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { Menu01Icon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";
import { useProgressStats } from "@/hooks/use-progress-stats";
import { Progress } from "@/components/ui/progress";

interface LearningPlatformHeaderProps {
  onMenuClick: () => void;
}

export function LearningPlatformHeader({
  onMenuClick,
}: LearningPlatformHeaderProps) {
  const stats = useProgressStats();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <IconWrapper icon={Menu01Icon} size={20} />
        </Button>

        {/* Logo/Title */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors"
        >
          DSA Platform
        </Link>

        {/* Progress Bar */}
        <div className="hidden md:flex flex-1 items-center gap-4 ml-8">
          <div className="flex-1 max-w-md">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span className="font-semibold">
                {stats.completed} / {stats.total}
              </span>
            </div>
            <Progress value={stats.percentage} className="h-2" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.DASHBOARD}>View Stats</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

