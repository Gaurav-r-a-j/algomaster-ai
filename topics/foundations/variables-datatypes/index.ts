import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { variablesDatatypesQuiz } from "@/topics/foundations/variables-datatypes/quiz"

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
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=8yjkWGRlUmc", // Variables & Data Types
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Variables Hindi
  }
}
