import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const bigO: Topic = {
  id: "big-o",
  title: "Big O Notation",
  description: "Understanding algorithm efficiency and complexity analysis.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 3,
  difficulty: "Medium",
  content: `# Big O Notation

Big O notation describes how the runtime or space requirements of an algorithm grow as input size increases.

## Common Complexities

- **O(1)**: Constant time - instant
- **O(log n)**: Logarithmic - very fast
- **O(n)**: Linear - proportional to input
- **O(n log n)**: Linearithmic - efficient sorting
- **O(n²)**: Quadratic - nested loops
- **O(2^n)**: Exponential - recursive problems

## Why It Matters

Understanding complexity helps you:
- Choose the right algorithm
- Optimize performance
- Predict scalability
`,
  quiz: [
    {
      id: 1,
      question: "What does O(1) mean?",
      options: [
        "Linear time",
        "Constant time",
        "Quadratic time",
        "Exponential time",
      ],
      correctAnswer: 1,
      explanation:
        "O(1) means constant time - the operation takes the same time regardless of input size.",
    },
  ],
};

