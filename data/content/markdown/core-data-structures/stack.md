# Stack

A **Stack** is a linear data structure that follows the **Last-In, First-Out (LIFO)** principle. Think of a stack of plates: you can only add or remove plates from the top.

## Visual Representation

```
    ┌─────┐
    │  3  │ ← Top (most recently added)
    ├─────┤
    │  2  │
    ├─────┤
    │  1  │ ← Bottom (first added)
    └─────┘
    
Push(4):        Pop():
    ┌─────┐         ┌─────┐
    │  4  │ ← New   │  2  │ ← New top
    ├─────┤         ├─────┤
    │  3  │         │  1  │
    ├─────┤         └─────┘
    │  2  │         
    ├─────┤         Returns: 3
    │  1  │
    └─────┘
```

## Core Operations

| Operation | Description | Time Complexity |
|-----------|-------------|-----------------|
| `push(x)` | Add element to top | O(1) |
| `pop()` | Remove and return top element | O(1) |
| `peek()` / `top()` | View top element without removing | O(1) |
| `isEmpty()` | Check if stack is empty | O(1) |
| `size()` | Get number of elements | O(1) |

---

## Implementation

### Python

```python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        """Add item to top of stack - O(1)"""
        self.items.append(item)
    
    def pop(self):
        """Remove and return top item - O(1)"""
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self.items.pop()
    
    def peek(self):
        """Return top item without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Peek from empty stack")
        return self.items[-1]
    
    def is_empty(self):
        """Check if stack is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items - O(1)"""
        return len(self.items)
    
    def __str__(self):
        return f"Stack({self.items})"

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.peek())  # 3
print(stack.pop())   # 3
print(stack.size())  # 2

# Python's built-in list works as a stack
stack = []
stack.append(1)  # push
stack.append(2)
stack.pop()      # pop → 2
```

### JavaScript

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(item) {
        this.items.push(item);
    }
    
    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    clear() {
        this.items = [];
    }
}

// Usage
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.peek()); // 2
console.log(stack.pop());  // 2

// Using array directly
const arr = [];
arr.push(1); // push
arr.pop();   // pop
```

### Java

```java
import java.util.Stack;
import java.util.EmptyStackException;

// Using built-in Stack class
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
System.out.println(stack.peek()); // 2
System.out.println(stack.pop());  // 2
System.out.println(stack.isEmpty()); // false

// Custom implementation using array
public class ArrayStack<T> {
    private Object[] data;
    private int top;
    private static final int DEFAULT_CAPACITY = 10;
    
    public ArrayStack() {
        data = new Object[DEFAULT_CAPACITY];
        top = -1;
    }
    
    public void push(T item) {
        if (top == data.length - 1) {
            resize();
        }
        data[++top] = item;
    }
    
    @SuppressWarnings("unchecked")
    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        T item = (T) data[top];
        data[top--] = null;
        return item;
    }
    
    @SuppressWarnings("unchecked")
    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return (T) data[top];
    }
    
    public boolean isEmpty() {
        return top == -1;
    }
    
    public int size() {
        return top + 1;
    }
    
    private void resize() {
        Object[] newData = new Object[data.length * 2];
        System.arraycopy(data, 0, newData, 0, data.length);
        data = newData;
    }
}
```

### C++

```cpp
#include <stack>
#include <vector>
#include <stdexcept>

// Using STL stack
std::stack<int> s;
s.push(1);
s.push(2);
std::cout << s.top() << std::endl;  // 2
s.pop();  // Note: C++ pop() doesn't return value
std::cout << s.size() << std::endl; // 1

// Custom implementation
template <typename T>
class Stack {
private:
    std::vector<T> data;
    
public:
    void push(const T& item) {
        data.push_back(item);
    }
    
    T pop() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        T item = data.back();
        data.pop_back();
        return item;
    }
    
    T& top() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return data.back();
    }
    
    bool isEmpty() const {
        return data.empty();
    }
    
    size_t size() const {
        return data.size();
    }
};
```

---

## Common Problems & Solutions

### 1. Valid Parentheses

```python
def is_valid(s: str) -> bool:
    """
    Check if parentheses are balanced.
    Input: "([{}])" → True
    Input: "([)]"   → False
    """
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0

# Test
print(is_valid("([{}])"))  # True
print(is_valid("([)]"))    # False
print(is_valid("(("))      # False
```

### 2. Next Greater Element

```python
def next_greater_element(arr):
    """
    For each element, find the next greater element to its right.
    Input: [4, 5, 2, 25] → [5, 25, 25, -1]
    """
    n = len(arr)
    result = [-1] * n
    stack = []  # Stack of indices
    
    for i in range(n - 1, -1, -1):
        # Pop smaller elements
        while stack and stack[-1] <= arr[i]:
            stack.pop()
        
        # Top of stack is next greater element
        if stack:
            result[i] = stack[-1]
        
        stack.append(arr[i])
    
    return result

print(next_greater_element([4, 5, 2, 25]))  # [5, 25, 25, -1]
```

### 3. Min Stack (Get minimum in O(1))

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # Track minimums
    
    def push(self, val):
        self.stack.append(val)
        # Push to min_stack if empty or val <= current min
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        val = self.stack.pop()
        # Pop from min_stack if it was the minimum
        if val == self.min_stack[-1]:
            self.min_stack.pop()
        return val
    
    def top(self):
        return self.stack[-1]
    
    def get_min(self):
        return self.min_stack[-1]

# Usage
ms = MinStack()
ms.push(3)
ms.push(1)
ms.push(2)
print(ms.get_min())  # 1
ms.pop()
print(ms.get_min())  # 1
ms.pop()
print(ms.get_min())  # 3
```

### 4. Evaluate Reverse Polish Notation

```python
def eval_rpn(tokens):
    """
    Evaluate expression in Reverse Polish Notation.
    Input: ["2", "1", "+", "3", "*"] → (2 + 1) * 3 = 9
    """
    stack = []
    operators = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b)  # Truncate toward zero
    }
    
    for token in tokens:
        if token in operators:
            b = stack.pop()
            a = stack.pop()
            stack.append(operators[token](a, b))
        else:
            stack.append(int(token))
    
    return stack[0]

print(eval_rpn(["2", "1", "+", "3", "*"]))  # 9
print(eval_rpn(["4", "13", "5", "/", "+"]))  # 6
```

### 5. Daily Temperatures

```python
def daily_temperatures(temperatures):
    """
    Days until warmer temperature.
    Input: [73, 74, 75, 71, 69, 72, 76, 73]
    Output: [1, 1, 4, 2, 1, 1, 0, 0]
    """
    n = len(temperatures)
    result = [0] * n
    stack = []  # Stack of indices
    
    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx
        stack.append(i)
    
    return result

print(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))
# [1, 1, 4, 2, 1, 1, 0, 0]
```

---

## Real-World Applications

| Application | How Stack is Used |
|-------------|-------------------|
| **Function Call Stack** | Track active function calls, local variables |
| **Undo/Redo** | Store previous states for reversal |
| **Browser History** | Back button navigation |
| **Expression Parsing** | Evaluate mathematical expressions |
| **Syntax Checking** | Validate code, HTML, parentheses |
| **Backtracking** | DFS, maze solving, recursion simulation |

---

## Stack vs Queue

| Feature | Stack (LIFO) | Queue (FIFO) |
|---------|--------------|--------------|
| Add | Top (push) | Back (enqueue) |
| Remove | Top (pop) | Front (dequeue) |
| Order | Last in, first out | First in, first out |
| Example | Undo history | Print queue |

---

## Key Takeaways

1. **LIFO** - Last In, First Out
2. **All operations O(1)** - push, pop, peek
3. **Great for** - backtracking, parsing, undo functionality
4. **Monotonic Stack** - powerful pattern for next greater/smaller problems
5. **Use built-in** - `list` (Python), `Stack` (Java), `stack` (C++)
