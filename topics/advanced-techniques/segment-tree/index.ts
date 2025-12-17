import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { segmentTreeQuiz } from "@/topics/advanced-techniques/segment-tree/quiz"

export const segmentTree: Topic = {
  id: "segment-tree",
  title: "Segment Tree",
  description: "Efficient data structure for range queries and updates.",
  category: AlgorithmType.RANGE_QUERY,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "8. Advanced Techniques",
  order: 33,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: segmentTreeQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=2bSS8rtFym4", // Segment Tree
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Segment Tree Hindi
  }
}
