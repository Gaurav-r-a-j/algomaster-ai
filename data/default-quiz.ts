import { Topic } from "@/types/curriculum"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const getDefaultQuiz = (topic: Topic) => {
  const quizBank: Record<string, QuizQuestion[]> = {
    // Foundations
    "variables-datatypes": [
      {
        id: 1,
        question: "Which data type would you use to store a decimal number?",
        options: ["int", "float/double", "char", "boolean"],
        correctAnswer: 1,
        explanation:
          "Floating point types (float, double) are designed to store decimal numbers.",
      },
      {
        id: 2,
        question:
          "What is the key difference between a primitive and a reference type?",
        options: [
          "Size only",
          "Primitives store values directly, references store memory addresses",
          "Speed only",
          "No difference",
        ],
        correctAnswer: 1,
        explanation:
          "Primitives hold the actual value, while references point to where data is stored in memory.",
      },
      {
        id: 3,
        question: "Which is NOT a primitive data type in most languages?",
        options: ["int", "String", "boolean", "char"],
        correctAnswer: 1,
        explanation:
          "String is typically a reference type (object), not a primitive.",
      },
    ],
    loops: [
      {
        id: 1,
        question:
          "Which loop is best when you don't know the number of iterations in advance?",
        options: ["for loop", "while loop", "Both are equal", "Neither"],
        correctAnswer: 1,
        explanation:
          "While loops are ideal when the termination condition depends on runtime values.",
      },
      {
        id: 2,
        question: "What happens if the loop condition is never false?",
        options: [
          "Loop exits immediately",
          "Infinite loop",
          "Compile error",
          "Runtime warning",
        ],
        correctAnswer: 1,
        explanation:
          "An infinite loop occurs when the condition never becomes false, potentially crashing the program.",
      },
      {
        id: 3,
        question:
          "In a for loop 'for(i=0; i<n; i++)', how many times does the loop run?",
        options: ["n-1 times", "n times", "n+1 times", "Depends on i"],
        correctAnswer: 1,
        explanation: "The loop runs n times: when i = 0, 1, 2, ..., n-1.",
      },
    ],
    recursion: [
      {
        id: 1,
        question: "What are the two essential parts of a recursive function?",
        options: [
          "Input and output",
          "Base case and recursive case",
          "Parameters and return",
          "Loop and condition",
        ],
        correctAnswer: 1,
        explanation:
          "Every recursive function needs a base case (stopping condition) and a recursive case (calls itself).",
      },
      {
        id: 2,
        question: "What happens without a proper base case?",
        options: [
          "Nothing",
          "Stack overflow",
          "Faster execution",
          "Memory optimization",
        ],
        correctAnswer: 1,
        explanation:
          "Without a base case, the function calls itself infinitely, causing stack overflow.",
      },
      {
        id: 3,
        question: "Which problem is naturally recursive?",
        options: [
          "Finding max in array",
          "Tree traversal",
          "Matrix addition",
          "Array reversal",
        ],
        correctAnswer: 1,
        explanation:
          "Trees have a recursive structure - each node's children are also trees.",
      },
    ],
    "big-o": [
      {
        id: 1,
        question: "Which complexity is more efficient: O(n) or O(n²)?",
        options: ["O(n²)", "O(n)", "Same efficiency", "Cannot compare"],
        correctAnswer: 1,
        explanation:
          "O(n) grows linearly while O(n²) grows quadratically, making O(n) more efficient.",
      },
      {
        id: 2,
        question:
          "What is the time complexity of accessing an array element by index?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        explanation:
          "Array access by index is O(1) because arrays use contiguous memory.",
      },
      {
        id: 3,
        question: "O(log n) typically indicates which type of algorithm?",
        options: [
          "Linear search",
          "Divide and conquer",
          "Brute force",
          "Nested loops",
        ],
        correctAnswer: 1,
        explanation:
          "O(log n) often results from halving the problem size each step, like binary search.",
      },
    ],
    // Data Structures
    "arrays-strings": [
      {
        id: 1,
        question:
          "What is the time complexity to insert at the beginning of an array?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        explanation: "All elements must shift right, making it O(n).",
      },
      {
        id: 2,
        question: "Strings in most languages are...",
        options: [
          "Mutable",
          "Immutable",
          "Always arrays",
          "Always linked lists",
        ],
        correctAnswer: 1,
        explanation:
          "Strings are typically immutable - operations create new strings.",
      },
    ],
    "linked-list": [
      {
        id: 1,
        question: "What is the advantage of linked lists over arrays?",
        options: [
          "Faster access by index",
          "Dynamic size and O(1) insertions",
          "Less memory usage",
          "Better cache locality",
        ],
        correctAnswer: 1,
        explanation:
          "Linked lists can grow dynamically and insert/delete in O(1) if you have the node.",
      },
      {
        id: 2,
        question: "How do you detect a cycle in a linked list?",
        options: [
          "Count nodes",
          "Floyd's (fast/slow pointer)",
          "Check all pairs",
          "Not possible",
        ],
        correctAnswer: 1,
        explanation:
          "Floyd's algorithm uses two pointers - if they meet, there's a cycle.",
      },
    ],
    stack: [
      {
        id: 1,
        question: "Which principle does a stack follow?",
        options: ["FIFO", "LIFO", "Random access", "Priority"],
        correctAnswer: 1,
        explanation:
          "Stack follows Last In First Out - the most recent element is removed first.",
      },
      {
        id: 2,
        question: "Which application uses a stack?",
        options: [
          "Print queue",
          "Function call management",
          "Task scheduling",
          "Network packets",
        ],
        correctAnswer: 1,
        explanation:
          "The call stack manages function calls and returns in programs.",
      },
    ],
    queue: [
      {
        id: 1,
        question: "Which principle does a queue follow?",
        options: ["LIFO", "FIFO", "Random access", "Priority"],
        correctAnswer: 1,
        explanation:
          "Queue follows First In First Out - elements are processed in arrival order.",
      },
      {
        id: 2,
        question: "BFS uses which data structure?",
        options: ["Stack", "Queue", "Heap", "Tree"],
        correctAnswer: 1,
        explanation: "BFS uses a queue to explore nodes level by level.",
      },
    ],
    hashing: [
      {
        id: 1,
        question: "What is the average time complexity for hash table lookup?",
        options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        explanation:
          "Hash tables provide O(1) average lookup using hash functions.",
      },
      {
        id: 2,
        question: "What is a hash collision?",
        options: [
          "Table is full",
          "Two keys hash to same index",
          "Key not found",
          "Memory leak",
        ],
        correctAnswer: 1,
        explanation:
          "A collision occurs when different keys produce the same hash index.",
      },
    ],
    // Searching & Sorting
    "linear-search": [
      {
        id: 1,
        question: "What is the time complexity of linear search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation:
          "Linear search checks each element once, giving O(n) complexity.",
      },
      {
        id: 2,
        question: "When is linear search preferred over binary search?",
        options: [
          "Large sorted arrays",
          "Small or unsorted arrays",
          "Never",
          "Always",
        ],
        correctAnswer: 1,
        explanation:
          "Linear search works on unsorted data and is simpler for small datasets.",
      },
    ],
    "binary-search": [
      {
        id: 1,
        question: "What is required for binary search to work?",
        options: [
          "Large array",
          "Sorted array",
          "Integer values only",
          "Linked list",
        ],
        correctAnswer: 1,
        explanation:
          "Binary search requires the data to be sorted to eliminate half each step.",
      },
      {
        id: 2,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correctAnswer: 2,
        explanation:
          "Binary search halves the search space each step, giving O(log n).",
      },
    ],
    "bubble-sort": [
      {
        id: 1,
        question: "What is the time complexity of bubble sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 2,
        explanation:
          "Bubble sort compares adjacent pairs in nested loops, giving O(n²).",
      },
      {
        id: 2,
        question: "Is bubble sort stable?",
        options: ["Yes", "No", "Depends", "N/A"],
        correctAnswer: 0,
        explanation:
          "Bubble sort is stable - equal elements maintain their relative order.",
      },
    ],
    "merge-sort": [
      {
        id: 1,
        question: "What paradigm does merge sort use?",
        options: [
          "Greedy",
          "Dynamic Programming",
          "Divide and Conquer",
          "Backtracking",
        ],
        correctAnswer: 2,
        explanation:
          "Merge sort divides the array, sorts halves, and conquers by merging.",
      },
      {
        id: 2,
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation:
          "Merge sort needs O(n) extra space for the temporary merge array.",
      },
    ],
    "quick-sort": [
      {
        id: 1,
        question: "What is the average time complexity of quick sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correctAnswer: 1,
        explanation:
          "Quick sort averages O(n log n) with good pivot selection.",
      },
      {
        id: 2,
        question: "What causes quick sort's worst case?",
        options: [
          "Random data",
          "Already sorted data with bad pivot",
          "Large arrays",
          "Odd sizes",
        ],
        correctAnswer: 1,
        explanation:
          "Poor pivot selection (like first element on sorted data) causes O(n²).",
      },
    ],
  }

  // Base questions for topics without specific questions
  const baseQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: `What is the primary use case for ${topic.title}?`,
      options: [
        "Data storage only",
        "Efficient problem solving",
        "User interface",
        "Network communication",
      ],
      correctAnswer: 1,
      explanation: `${topic.title} is primarily used for efficient algorithmic problem solving.`,
    },
    {
      id: 2,
      question: `What is the time complexity of ${topic.title}?`,
      options: ["O(n!)", "O(2^n)", topic.complexity.time, "O(1)"],
      correctAnswer: 2,
      explanation: `The time complexity is ${topic.complexity.time}.`,
    },
    {
      id: 3,
      question: `When should you use ${topic.title}?`,
      options: [
        "Never",
        "When it matches the problem requirements",
        "Always",
        "Only for strings",
      ],
      correctAnswer: 1,
      explanation:
        "Choose the right algorithm based on the problem constraints and requirements.",
    },
  ]

  return quizBank[topic.id] || baseQuestions
}
