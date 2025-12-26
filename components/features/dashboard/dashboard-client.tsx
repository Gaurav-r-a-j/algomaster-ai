"use client"

import { useState, useMemo } from "react"
import { useProgress } from "@/context/progress-context"
import { useProgressStats } from "@/hooks/use-progress-stats"
import { TOPICS } from "@/data/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"
import { ROUTES } from "@/constants/routes"
import { TopicCard } from "@/components/features/learning/components/topic-card"
import { DashboardStats } from "./dashboard-stats"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Container } from "@/components/common/container"

type FilterType = "all" | "easy" | "medium" | "hard" | "todo" | "completed"

export function DashboardClient() {
  const { completedTopics, isCompleted } = useProgress()
  const stats = useProgressStats()
  const progressPercent = stats.percentage
  const totalTopics = stats.total
  const completedCount = stats.completed
  const [filter, setFilter] = useState<FilterType>("all")

  // Filter topics based on selected filter
  const filteredTopics = useMemo(() => {
    let topics = TOPICS

    switch (filter) {
      case "easy":
        topics = topics.filter((t) => t.difficulty === "Easy")
        break
      case "medium":
        topics = topics.filter((t) => t.difficulty === "Medium")
        break
      case "hard":
        topics = topics.filter((t) => t.difficulty === "Hard")
        break
      case "todo":
        topics = topics.filter((t) => !isCompleted(t.id))
        break
      case "completed":
        topics = topics.filter((t) => isCompleted(t.id))
        break
      default:
        // "all" - no filter
        break
    }

    return topics
  }, [filter, isCompleted])

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <header className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            DSA Learning Path
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl leading-relaxed">
            A structured roadmap to mastering algorithms, powered by interactive
            visualizations and AI tutoring.
          </p>
        </header>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Your Progress</CardTitle>
              <span className="font-mono font-bold text-primary">
                {completedCount} / {totalTopics} Lessons
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercent} className="h-3" />
          </CardContent>
        </Card>

        {/* Stats */}
        <DashboardStats />

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Topics Grid */}
          <TabsContent value={filter} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
            {filteredTopics.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No topics found for this filter.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  )
}

