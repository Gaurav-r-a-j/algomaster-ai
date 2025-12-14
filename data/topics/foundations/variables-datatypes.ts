import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const variablesDatatypes: Topic = {
  id: "variables-datatypes",
  title: "Variables & Data Types",
  description: "Understanding how computers store and manipulate data.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 0,
  difficulty: "Easy",
  content: "", // Content loaded dynamically from data/content/markdown/variables-datatypes.md
  quiz: [
    {
      id: 1,
      question: "Which of these is a Reference Type?",
      options: [
        "String",
        "Number",
        "Boolean",
        "Object",
      ],
      correctAnswer: 3,
      explanation: "Objects (and Arrays) are Reference Types, meaning variables store a 'link' to the memory, not the value itself."
    }
  ],
  practiceLinks: []
}
