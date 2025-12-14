"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

import type { Topic } from "@/types/curriculum";

interface TopicNavigationProps {
  prevTopic: Topic | null;
  nextTopic: Topic | null;
}

export function TopicNavigation({
  prevTopic,
  nextTopic,
}: TopicNavigationProps) {
  const getTopicSlug = (topic: Topic) => {
    return topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div className="shrink-0 border-t border-border bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center gap-4">
      {prevTopic ? (
        <Button variant="outline" asChild>
          <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
            <IconWrapper icon={ChevronLeftIcon} size={16} className="mr-2" />
            Previous: {prevTopic.title}
          </Link>
        </Button>
      ) : (
        <div />
      )}

      {nextTopic ? (
        <Button variant="outline" asChild>
          <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
            Next: {nextTopic.title}
            <IconWrapper icon={ChevronRightIcon} size={16} className="ml-2" />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

