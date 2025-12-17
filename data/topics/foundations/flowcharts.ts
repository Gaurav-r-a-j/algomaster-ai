import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { flowchartsQuiz } from "@/data/content/markdown/foundations/flowcharts.quiz"

export const flowcharts: Topic = {
  id: "flowcharts",
  title: "Flowcharts",
  description: "Visualizing program flow using standard symbols and diagrams.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 1,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: flowchartsQuiz,
  practiceLinks: []
}
