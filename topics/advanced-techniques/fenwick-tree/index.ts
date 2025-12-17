import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { fenwickTreeQuiz } from "@/topics/advanced-techniques/fenwick-tree/quiz"

export const fenwickTree: Topic = {
  id: "fenwick-tree",
  title: "Fenwick Tree",
  description: "Binary Indexed Tree for efficient prefix sum queries.",
  category: AlgorithmType.RANGE_QUERY,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "8. Advanced Techniques",
  order: 34,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: fenwickTreeQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=kPaJfAUwViY", // Fenwick Tree
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Fenwick Tree Hindi
  }
}
