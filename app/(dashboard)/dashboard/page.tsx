"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { TOPICS } from "@/data/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
  transitions,
} from "@/lib/animations"
import {
  ArrowUp01Icon,
  BookOpenIcon,
  CheckmarkCircleIcon,
  PlayIcon,
} from "@/lib/icons"
import { useProgressStats } from "@/hooks/use-progress-stats"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { IconWrapper } from "@/components/common/icon-wrapper"

export default function DashboardPage() {
  const { completedTopics } = useProgress()
  const stats = useProgressStats()

  // Get recent topics (last 5)
  const _recentTopics = TOPICS.slice(0, 5)

  // Get recommended next topics (not completed, ordered)
  const recommendedTopics = TOPICS.filter(
    (t) => !completedTopics.includes(t.id)
  )
    .sort((a, b) => a.order - b.order)
    .slice(0, 6)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="space-y-6"
    >
      {/* Compact Page Header */}
      <motion.div
        variants={slideUp}
        className="flex items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
            Welcome Back!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Continue your DSA learning journey
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Progress Card */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-foreground mb-2 text-2xl font-bold">
                  {stats.percentage}%
                </div>
                <Progress value={stats.percentage} className="h-2" />
                <p className="text-muted-foreground mt-2 text-xs">
                  {stats.completed} of {stats.total} lessons completed
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Completed Topics */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-foreground mb-2 text-2xl font-bold">
                  {stats.completed}
                </div>
                <p className="text-muted-foreground text-xs">
                  Lessons finished
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* In Progress */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-foreground mb-2 text-2xl font-bold">
                  {stats.inProgress}
                </div>
                <p className="text-muted-foreground text-xs">
                  Currently learning
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Remaining */}
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-foreground mb-2 text-2xl font-bold">
                  {stats.notStarted}
                </div>
                <p className="text-muted-foreground text-xs">
                  Lessons to start
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-8 grid gap-6 md:grid-cols-2"
        >
          <motion.div variants={staggerItem}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IconWrapper icon={BookOpenIcon} size={20} />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm">
                  Pick up where you left off or start a new topic.
                </p>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href={ROUTES.HOME}>Browse All Topics</Link>
                  </Button>
                  {recommendedTopics.length > 0 && (
                    <Button variant="outline" asChild>
                      <Link href={ROUTES.TOPIC(generateTopicSlug(recommendedTopics[0].title))}>
                        Start Learning
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
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
          </motion.div>
        </motion.div>

        {/* Recommended Next Topics */}
        {recommendedTopics.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={transitions.smooth}
          >
            <Card className="mb-8">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <IconWrapper icon={PlayIcon} size={20} />
                  Recommended Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {recommendedTopics.slice(0, 6).map((topic, _idx) => {
                    const topicSlug = generateTopicSlug(topic.title)
                    return (
                      <motion.div key={topic.id} variants={staggerItem}>
                        <Link
                          href={ROUTES.TOPIC(topicSlug)}
                          className="bg-muted/50 hover:bg-muted block rounded-lg p-4 transition-colors"
                        >
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-foreground font-semibold">
                              {topic.title}
                            </h3>
                            <span className="text-muted-foreground text-xs">
                              #{topic.order + 1}
                            </span>
                          </div>
                          <p className="text-muted-foreground line-clamp-2 text-sm">
                            {topic.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded px-2 py-0.5 text-xs ${
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
                      </motion.div>
                    )
                  })}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Recent Activity */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={{ ...transitions.smooth, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <IconWrapper icon={CheckmarkCircleIcon} size={20} />
                Recent Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedTopics.length > 0 ? (
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                  className="space-y-2"
                >
                  {completedTopics
                    .slice(-5)
                    .reverse()
                    .map((topicId, _idx) => {
                      const topic = TOPICS.find((t) => t.id === topicId)
                      if (!topic) {
                        return null
                      }
                      return (
                        <motion.div
                          key={topicId}
                          variants={staggerItem}
                          className="bg-muted/50 hover:bg-muted flex items-center justify-between rounded-lg p-3 transition-colors"
                        >
                          <div>
                            <p className="text-foreground font-medium">
                              {topic.title}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {topic.module}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={ROUTES.TOPIC(
                                generateTopicSlug(topic.title)
                              )}
                            >
                              Review
                            </Link>
                          </Button>
                        </motion.div>
                      )
                    })}
                </motion.div>
              ) : (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  No completed topics yet. Start learning to see your progress
                  here!
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
