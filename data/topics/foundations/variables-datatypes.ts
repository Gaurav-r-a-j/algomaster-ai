import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const variablesDatatypes: Topic = {
  id: "variables-datatypes",
  title: "Variables & Data Types",
  description:
    "The absolute fundamentals. How computers remember information, from physical memory to high-level types.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(1)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 0,
  difficulty: "Easy",
  starterCode: {
    cpp: `#include <iostream>
#include <string>
#include <limits>
using namespace std;

int main() {
    // 1. Integer (Whole Numbers)
    // 4 bytes, range: -2,147,483,648 to 2,147,483,647
    int age = 25;
    
    // 2. Double (Decimal Numbers)
    // 8 bytes, high precision
    double balance = 100.50;
    
    // 3. Boolean (True/False)
    // 1 byte (technically 1 bit, but padded)
    bool isActive = true;
    
    // 4. Character (Single Letter)
    // 1 byte
    char grade = 'A';
    
    // 5. String (Text)
    // Dynamic size
    string name = "AlgoMaster";

    cout << "User Profile:" << endl;
    cout << "Name: " << name << " (" << &name << ")" << endl; // &name shows memory address
    cout << "Age: " << age << " (" << sizeof(age) << " bytes)" << endl;
    
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        // Primitive Types (Stored in Stack)
        int id = 101;           // 4 bytes
        double price = 99.99;   // 8 bytes
        boolean isSold = false; // 1 bit/byte
        char currency = '$';    // 2 bytes (Unicode)
        
        // Reference Types (Stored in Heap)
        String productName = new String("Gaming Laptop");
        int[] scores = {98, 95, 89};

        System.out.println("Product: " + productName);
        System.out.println("ID: " + id);
        System.out.println("Price: " + currency + price);
    }
}`,
    python: `# In Python, everything is an object!
# Variables are references (names) pointing to objects in memory.

# Integer (Arbitrary precision in Python)
count = 42 

# Float
rating = 4.5

# String (Immutable)
app_name = "DSA Master"

# Boolean
is_verified = True

# List (Mutable - Reference Type)
tags = ["learning", "dsa", "mastery"]

# Printing types and memory addresses
print(f"Value: {count}, Type: {type(count)}, ID: {hex(id(count))}")
print(f"Value: {app_name}, Type: {type(app_name)}, ID: {hex(id(app_name))}")
`,
    javascript: `// JavaScript is Dynamically Typed
// Variables don't have types; Values have types.

// 1. Number (Double-precision 64-bit binary format IEEE 754)
// Both integers and floats are 'number' type.
let budget = 1000;
let pi = 3.14159;

// 2. String
let greeting = "Hello World";

// 3. Boolean
let isOnline = true;

// 4. Object (Reference Type - Heap)
let user = {
    id: 1,
    username: "coder123"
};

// 5. Array (Special Object)
let skills = ["JS", "TS", "React"];

// Typeof operator
console.log("Type of budget:", typeof budget); 
console.log("Type of user:", typeof user);`,
  },
  content: `# Variables & Data Types: From 0 to 100
 
Welcome to the absolute beginning. Before we write complex algorithms, we must understand the "atoms" of programming: **Variables**.
 
Most tutorials say "A variable is like a box". That is a good start, but it's incomplete. To be a top 1% engineer, you need to understand what actually happens in the computer's memory.
 
---
 
## 1. The Mental Model: "The Box" vs "The Label"
 
### Level 1: The Box Analogy (Primitive Types)
Imagine a physical warehouse (Memory/RAM). You create a small box, label it \`age\`, and put the number \`25\` inside.
- The **Variable Name** (\`age\`) is the label on the box.
- The **Value** (\`25\`) is the content inside.
- The **Data Type** (\`int\`) tells us what *kind* of box it is (e.g., a small box for numbers, a long tube for text).
 
This analogy works perfectly for simple types found in C++ or Java primitives (\`int\`, \`bool\`, \`char\`).
 
### Level 2: The Remote Control Analogy (Reference Types)
Now, imagine a House (Object). You can't stuff a House inside a small box. Instead, you build the House somewhere else (The Heap), and in your small box, you store the **address** of the House.
- The variable doesn't hold the object itself.
- It holds a **reference** (or pointer) to where the object lives.
 
\`\`\`mermaid
graph LR
    A[Variable: user] -->|Contains Address 0x123| B(Heap Memory: 0x123)
    B --> C{Object Data}
    C --> D[name: "Alice"]
    C --> E[role: "Admin"]
\`\`\`
 
---
 
## 2. Memory Architecture: Stack vs Heap
 
Understanding where variables live is crucial for performance and bug-squashing.
 
| Feature | Stack Memory | Heap Memory |
| :--- | :--- | :--- |
| **What is it?** | Organized structure, LIFO order. Very fast. | A large, unstructured pool of memory. Slower. |
| **What lives here?** | Function calls, local primitive variables (\`int x = 10\`). | Large objects, Lists, Maps, custom Classes. |
| **Management** | Automatic. CPU adds/removes data instantly. | Manual (C++) or Garbage Collected (Java/Python/JS). |
| **Size Limit** | Small (MBs). Stack Overflow if exceeded. | Large (GBs). Only limited by physical RAM. |
 
> [!IMPORTANT]
> **Why does this matter?**  
> Accessing data on the **Stack** is incredibly fast because it's effectively "right next to" the CPU's execution context.  
> Accessing data on the **Heap** involves "chasing pointers" (following the address to find the data), which has a slight overhead.
 
---
 
## 3. The Core Data Types
 
Every language has these fundamental building blocks.
 
### Integer (\`int\`)
Whole numbers without decimals.
- **Size**: Typically 4 bytes (32-bit).
- **Range**: -2 billion to +2 billion.
- **Use for**: Counts, Indices, IDs.
 
### Floating Point (\`float\`, \`double\`)
Numbers with decimals.
- **Size**: 4 bytes (Float) or 8 bytes (Double).
- **Pitfall**: **Precision errors**. Computers cannot store \`0.1\` perfectly in binary. \`0.1 + 0.2\` might equal \`0.30000000000000004\`.
- **Use for**: Scientific calculations, coordinates. **NEVER** use for money (use \`BigDecimal\` or libraries).
 
### Boolean (\`bool\`)
The simplest type. \`true\` (1) or \`false\` (0).
- **Use for**: Flags, conditions (\`isLoggedIn\`, \`hasPermission\`).
 
### String
Text. In most low-level views, a String is just an **Array of Characters**.
- \`"Hello"\` is actually \`['H', 'e', 'l', 'l', 'o', '\\0']\`.
 
---
 
## 4. Static vs Dynamic Typing
 
This is the biggest divide in programming languages.
 
### Statically Typed (C++, Java, TypeScript)
You must declare the type upfront. The compiler enforces it.
\`\`\`java
int age = 25;
age = "Hello"; // ❌ ERROR! The compiler stops you immediately.
\`\`\`
- **Pros**: Safer, better tooling (autocomplete), fewer runtime bugs.
- **Cons**: More verbose code.
 
### Dynamically Typed (Python, JavaScript)
The type is determined at runtime. A variable can hold anything.
\`\`\`javascript
let age = 25;
age = "Hello"; // ✅ Allowed. 'age' is now a string.
\`\`\`
- **Pros**: Flexible, faster to write initial code.
- **Cons**: "Type Errors" crash your app while it's running.
 
---
 
## 5. Common Pitfalls & Interview Questions
 
> [!WARNING]
> **The Integer Overflow**
> What happens if you add 1 to the maximum possible integer?
> In many languages (like C++), it "wraps around" to the minimum negative number!
> \`2,147,483,647 + 1 = -2,147,483,648\`
 
> [!TIP]
> **Pass by Value vs Pass by Reference**
> - **Primitives** are usually copied. Changing the copy doesn't affect the original.
> - **Objects** are passed by reference (the "address"). Changing the object inside a function **DOES** affect the original outside!
 
---
 
## 6. Real World Application
 
- **Databases**: Selecting the right column type (\`VARCHAR\` vs \`TEXT\`, \`INT\` vs \`BIGINT\`) saves terabytes of storage.
- **Network Packets**: Data sent over the internet is serialized into bytes. Knowing your types ensures data integrity.
- **Game Dev**: Using \`float\` for player positions allows smooth movement, whereas \`int\` would make movement "snappy" and grid-like.
`,
  quiz: [
    {
      id: 1,
      question: "Which memory region is faster for access?",
      options: [
        "The Heap (Large storage)",
        "The Stack (LIFO structure)",
        "The Hard Drive",
        "Cloud Storage",
      ],
      correctAnswer: 1,
      explanation:
        "The Stack is managed directly by the CPU and has a very strictly organized structure, making it significantly faster for allocating and accessing memory than the Heap.",
    },
    {
      id: 2,
      question: "What happens if you try to store 'Hello' in an 'int' variable in Java?",
      options: [
        "It crashes the computer",
        "It converts 'Hello' to a number automatically",
        "Compile-time Error (Code won't run)",
        "It works fine",
      ],
      correctAnswer: 2,
      explanation:
        "Java is Statically Typed. The compiler checks types before running. You cannot assign a String to an Integer variable.",
    },
    {
      id: 3,
      question: "Why is 0.1 + 0.2 sometimes not equal to 0.3?",
      options: [
        "The computer is broken",
        "Floating point precision errors in binary arithmetic",
        "JavaScript is just bad at math",
        "It is always equal to 0.3",
      ],
      correctAnswer: 1,
      explanation:
        "Computers store numbers in binary (0s and 1s). Some decimals like 0.1 cannot be represented perfectly in binary, leading to tiny rounding errors.",
    },
  ],
  practiceProblems: [
    {
      id: "p1",
      title: "Swap Two Numbers",
      description: "Given two variables `a` and `b`, swap their values without using a third variable if possible, or just standard swap.",
      difficulty: "Easy",
         starterCode: {
        javascript: `function swap(a, b) {
    console.log("Before: a =", a, ", b =", b);
    
    // TODO: Swap the values
    // Your code here
    
    console.log("After: a =", a, ", b =", b);
    return [a, b];
}

swap(5, 10);`,
        python: `def swap(a, b):
    print(f"Before: a = {a}, b = {b}")
    
    # TODO: Swap the values
    # Python has a cool one-liner for this!
    
    print(f"After: a = {a}, b = {b}")
    return a, b

swap(5, 10)`,
        cpp: `#include <iostream>
using namespace std;

void swap(int a, int b) {
    cout << "Before: a = " << a << ", b = " << b << endl;
    
    // TODO: Swap the values
    int temp = a;
    a = b;
    b = temp;
    
    cout << "After: a = " << a << ", b = " << b << endl;
}

int main() {
    swap(5, 10);
    return 0;
}`,
        java: `public class Main {
    public static void swap(int a, int b) {
        System.out.println("Before: a = " + a + ", b = " + b);
        
        // TODO: Swap the values
        int temp = a;
        a = b;
        b = temp;
        
        System.out.println("After: a = " + a + ", b = " + b);
    }

    public static void main(String[] args) {
        swap(5, 10);
    }
}`
      }
    }
  ],
  practiceLinks: [
    {
      title: "LeetCode: Two Sum",
      url: "https://leetcode.com/problems/two-sum/",
      difficulty: "Easy",
    },
  ],
}
