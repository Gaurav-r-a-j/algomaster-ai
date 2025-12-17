import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { queueQuiz } from "@/data/content/markdown/core-data-structures/queue.quiz"

export const queue: Topic = {
  id: "queue",
  title: "Queue",
  description: "FIFO data structure for managing elements.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(1)", space: "O(n)" },
  visualizerType: VisualizerType.QUEUE,
  module: "2. Core Data Structures",
  order: 7,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Design Circular Queue",
      url: "https://leetcode.com/problems/design-circular-queue/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Queue Data Structure",
      url: "https://www.geeksforgeeks.org/queue-data-structure/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Moving Average from Data Stream",
      url: "https://leetcode.com/problems/moving-average-from-data-stream/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Design Hit Counter",
      url: "https://leetcode.com/problems/design-hit-counter/",
      difficulty: "Medium",
    },
  ],
  quiz: queueQuiz,
}
