import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  quiz: [
    {
      id: 1,
      question: "Which symbol represents a decision in a flowchart?",
      options: [
        "Rectangle",
        "Oval",
        "Diamond",
        "Parallelogram"
      ],
      correctAnswer: 2,
      explanation: "A diamond shape is used to represent a decision point (like an if/else statement) in a flowchart."
    }
  ],
  practiceLinks: []
}
