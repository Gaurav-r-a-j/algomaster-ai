import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const algorithmsPseudocode: Topic = {
  id: "algorithms-pseudocode",
  title: "Algorithms & Pseudocode",
  description: "Writing logic without syntax constraints using pseudocode.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 2,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: [
    {
      id: 1,
      question: "What is an algorithm?",
      options: [
        "A specific programming language",
        "A step-by-step procedure to solve a problem",
        "A hardware component",
        "A secret code"
      ],
      correctAnswer: 1,
      explanation: "An algorithm is a finite sequence of well-defined instructions to solve a class of problems."
    }
  ],
  practiceLinks: []
}
