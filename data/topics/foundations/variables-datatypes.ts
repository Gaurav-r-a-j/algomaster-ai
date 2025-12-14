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

## What are Variables?

A variable is a named storage location in memory that holds a value. Think of it like a labeled box where you can store different types of information.

## Common Data Types

### 1. Integer (int)
Whole numbers without decimal points.

\`\`\`python
age = 25
count = 100
\`\`\`

### 2. Float/Double
Numbers with decimal points.

\`\`\`python
temperature = 98.6
pi = 3.14159
\`\`\`

### 3. String
Sequences of characters, enclosed in quotes.

\`\`\`python
name = "AlgoMaster"
message = 'Hello, World!'
\`\`\`

### 4. Boolean
Represents true or false values.

\`\`\`python
is_active = True
is_complete = False
\`\`\`

## Variable Naming Rules

- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Case-sensitive (age ≠ Age)
- Cannot use reserved keywords
- Use descriptive names

## Best Practices

1. Use meaningful names: \`user_age\` instead of \`a\`
2. Follow naming conventions (camelCase, snake_case)
3. Initialize variables before use
4. Choose appropriate data types

## Practice

Try creating variables for:
- Your name (string)
- Your age (integer)
- Your height in meters (float)
- Whether you're a student (boolean)
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
