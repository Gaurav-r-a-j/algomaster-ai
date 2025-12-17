import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { variablesDatatypesQuiz } from "@/data/content/markdown/foundations/variables-datatypes.quiz"

export const variablesDatatypes: Topic = {
  id: "variables-datatypes",
  title: "Variables & Data Types",
  description: "Understanding how computers store and manipulate data.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 3,
  difficulty: "Easy",
  content: "", // Content loaded dynamically from data/content/markdown/variables-datatypes.md
  quiz: variablesDatatypesQuiz,
  practiceLinks: [],
}
