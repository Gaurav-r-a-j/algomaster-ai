"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";
import { generateTopicSlug } from "@/utils/common/slug";
import type { Topic } from "@/types/curriculum";

interface TopicNavigationProps {
  prevTopic: Topic | null;
  nextTopic: Topic | null;
}

export function TopicNavigation({
  prevTopic,
  nextTopic,
}: TopicNavigationProps) {
  return (
    <div className="sticky bottom-0 z-40 shrink-0 border-t border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center gap-4">
          {prevTopic ? (
            <Button variant="outline" asChild size="lg" className="flex-1 sm:flex-initial">
              <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                <IconWrapper icon={ChevronLeftIcon} size={16} className="mr-2" />
                <span className="hidden sm:inline">Previous: </span>
                <span className="truncate">{prevTopic.title}</span>
              </Link>
            </Button>
          ) : (
            <div className="flex-1 sm:flex-initial" />
          )}

          {nextTopic ? (
            <Button variant="outline" asChild size="lg" className="flex-1 sm:flex-initial">
              <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                <span className="hidden sm:inline">Next: </span>
                <span className="truncate">{nextTopic.title}</span>
                <IconWrapper icon={ChevronRightIcon} size={16} className="ml-2" />
              </Link>
            </Button>
          ) : (
            <div className="flex-1 sm:flex-initial" />
          )}
        </div>
      </div>
    </div>
  );
}

