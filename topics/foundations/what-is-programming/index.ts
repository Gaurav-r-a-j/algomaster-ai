import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { whatIsProgrammingQuiz } from "@/topics/foundations/what-is-programming/quiz"

export const whatIsProgramming: Topic = {
  id: "what-is-programming",
  title: "What is Programming?",
  description: "Introduction to coding, how computers understand code, and the role of programming languages.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 0,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: whatIsProgrammingQuiz,
  practiceLinks: []
}
