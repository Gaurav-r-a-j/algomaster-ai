import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { bitManipulationQuiz } from "@/data/content/markdown/advanced-techniques/bit-manipulation.quiz"

export const bitManipulation: Topic = {
  id: "bit-manipulation",
  title: "Bit Manipulation",
  description: "Efficient algorithms using bitwise operations.",
  category: AlgorithmType.BIT_MANIPULATION,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "8. Advanced Techniques",
  order: 35,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: bitManipulationQuiz,
}
