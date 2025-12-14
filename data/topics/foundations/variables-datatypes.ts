import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const variablesDatatypes: Topic = {
  id: "variables-datatypes",
  title: "Variables & Data Types",
  description:
    "The atoms of programming. Understanding how computers store data.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 0,
  difficulty: "Easy",
  starterCode: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Integer: For whole numbers
    int age = 25;
    // Double: For decimal numbers
    double temperature = 98.6;
    // Char: For single characters
    char grade = 'A';
    // String: For sequences of characters
    string name = "AlgoMaster";
    // Boolean: For true/false values
    bool isLoggedIn = true;

    cout << "Name: " << name << ", Age: " << age << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        // Integer: For whole numbers
        int age = 25;
        // Double: For decimal numbers
        double temperature = 98.6;
        // Char: For single characters
        char grade = 'A';
        // String: For sequences of characters
        String name = "AlgoMaster";
        // Boolean: For true/false values
        boolean isLoggedIn = true;

        System.out.println("Name: " + name + ", Age: " + age);
    }
}`,
    python: `# Integer: For whole numbers
age = 25
# Float: For decimal numbers
temperature = 98.6
# String: For sequences of characters
name = "AlgoMaster"
# Boolean: For true/false values
is_logged_in = True

print(f"Name: {name}, Age: {age}")`,
    javascript: `// Number: For both whole and decimal numbers
let age = 25;
let temperature = 98.6;
// String: For sequences of characters
let name = "AlgoMaster";
// Boolean: For true/false values
let isLoggedIn = true;

console.log(\`Name: \${name}, Age: \${age}\`);`,
  },
  content: `# Variables & Data Types

Variables are containers that store data values. They are the fundamental building blocks of any program.

## The Container Analogy

Think of a variable as a labeled box where you store information. The **Data Type** is a rule that says what *kind* of item you can put in the box. This is crucial because the computer allocates memory differently for a whole number versus a long piece of text.

## Common Data Types

### 1. Integer (int)
Stores whole numbers, like -10, 0, or 42. Usually takes up 4 bytes of memory.

\`\`\`python
age = 25
count = 100
\`\`\`

### 2. Floating-Point (float, double)
Stores numbers with decimal points, like 3.14159. \`double\` is more precise and can store larger numbers than \`float\`.

\`\`\`python
temperature = 98.6
pi = 3.14159
\`\`\`

### 3. String
Stores a sequence of characters, like "Hello, World!". In many languages, a string is internally represented as an array of characters.

\`\`\`python
name = "AlgoMaster"
message = 'Hello, World!'
\`\`\`

### 4. Boolean
The simplest type, representing either \`true\` or \`false\`. It's a digital switch, perfect for tracking states like "is user logged in?".

\`\`\`python
is_active = True
is_complete = False
\`\`\`

## Real World Application

Every time you fill out a form online, you're using data types. Your name is a \`string\`, your age is an \`integer\`, and when you check a box to agree to terms, that's a \`boolean\`. Understanding data types is the first step to building any kind of software.
`,
  quiz: [
    {
      id: 1,
      question: "What is a variable?",
      options: [
        "A function that performs calculations",
        "A named storage location that holds a value",
        "A type of loop",
        "A data structure",
      ],
      correctAnswer: 1,
      explanation:
        "A variable is a named storage location in memory that holds a value.",
    },
    {
      id: 2,
      question: "Which data type is used for whole numbers?",
      options: ["Float", "String", "Integer", "Boolean"],
      correctAnswer: 2,
      explanation:
        "Integers are used for whole numbers without decimal points.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Variables in Python",
      url: "https://www.geeksforgeeks.org/python-variables/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Basic Data Types",
      url: "https://www.hackerrank.com/challenges/python-data-types/problem",
      difficulty: "Easy",
    },
  ],
}
