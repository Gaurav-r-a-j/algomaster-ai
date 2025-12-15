import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  quiz: [
    {
      id: 1,
      question: "What is a program?",
      options: [
        "A physical part of the computer",
        "A set of instructions for the computer to execute",
        "A video game",
        "A type of computer virus"
      ],
      correctAnswer: 1,
      explanation: "A program is a specific set of ordered operations for a computer to perform."
    },
    {
       id: 2,
       question: "What does the CPU do?",
       options: [
         "Stores data permanently",
         "Executes instructions",
         "Displays images on screen",
         "Connects to the internet"
       ],
       correctAnswer: 1,
       explanation: "The Central Processing Unit (CPU) is the brain of the computer that fetches, decodes, and executes instructions."
    }
  ],
  practiceLinks: []
}
