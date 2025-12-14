"use client";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/context/progress-context";
import { useProgressStats } from "@/hooks/use-progress-stats";
import { TOPICS } from "@/data/curriculum";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { IconWrapper } from "@/components/common/icon-wrapper";
import {
  ArrowUp01Icon,
  BookOpenIcon,
  CheckmarkCircleIcon,
  PlayIcon,
} from "@/lib/icons";

export default function DashboardPage() {
  const { completedTopics } = useProgress();
  const stats = useProgressStats();

  // Get recent topics (last 5)
  const recentTopics = TOPICS.slice(0, 5);

  // Get recommended next topics (not completed, ordered)
  const recommendedTopics = TOPICS.filter(
    (t) => !completedTopics.includes(t.id)
  )
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-8">
          <PageHeader
            title="Welcome Back!"
            description="Continue your DSA learning journey"
          />
        </div>
      </div>

      <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Progress Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stats.percentage}%
                </div>
                <Progress value={stats.percentage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.completed} of {stats.total} lessons completed
                </p>
              </CardContent>
            </Card>

            {/* Completed Topics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stats.completed}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lessons finished
                </p>
              </CardContent>
            </Card>

            {/* In Progress */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stats.inProgress}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently learning
                </p>
              </CardContent>
            </Card>

            {/* Remaining */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stats.notStarted}
                </div>
                <p className="text-xs text-muted-foreground">
                  Lessons to start
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconWrapper icon={BookOpenIcon} size={20} />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Pick up where you left off or start a new topic.
                </p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={ROUTES.HOME}>Browse All Topics</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={ROUTES.DASHBOARD}>View Progress</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconWrapper icon={ArrowUp01Icon} size={20} />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Easy Topics</span>
                    <span className="font-semibold">
                      {stats.byDifficulty.Easy?.completed || 0} /{" "}
                      {stats.byDifficulty.Easy?.total || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Medium Topics</span>
                    <span className="font-semibold">
                      {stats.byDifficulty.Medium?.completed || 0} /{" "}
                      {stats.byDifficulty.Medium?.total || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hard Topics</span>
                    <span className="font-semibold">
                      {stats.byDifficulty.Hard?.completed || 0} /{" "}
                      {stats.byDifficulty.Hard?.total || 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Next Topics */}
          {recommendedTopics.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconWrapper icon={PlayIcon} size={20} />
                  Recommended Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recommendedTopics.map((topic) => {
                    const topicSlug = topic.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "");
                    return (
                    <Link
                      key={topic.id}
                      href={ROUTES.TOPIC(topicSlug)}
                      className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">
                          {topic.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          #{topic.order + 1}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {topic.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            topic.difficulty === "Easy"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : topic.difficulty === "Medium"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {topic.difficulty}
                        </span>
                      </div>
                    </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconWrapper icon={CheckmarkCircleIcon} size={20} />
                Recent Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedTopics.length > 0 ? (
                <div className="space-y-2">
                  {completedTopics
                    .slice(-5)
                    .reverse()
                    .map((topicId) => {
                      const topic = TOPICS.find((t) => t.id === topicId);
                      if (!topic) {return null;}
                      return (
                        <div
                          key={topicId}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {topic.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {topic.module}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={ROUTES.TOPIC(
                              topic.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-+|-+$/g, "")
                            )}>
                              Review
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No completed topics yet. Start learning to see your progress
                  here!
                </p>
              )}
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
