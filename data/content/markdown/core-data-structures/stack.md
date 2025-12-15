# Stack

A Stack is an abstract data type that follows the **Last-In, First-Out (LIFO)** principle. Imagine a stack of plates: you can only add a new plate to the top, and you can only remove the top plate.

## Core Operations (All O(1))

- **Push:** Adds an element to the top of the stack
- **Pop:** Removes and returns the top element
- **Peek (or Top):** Looks at the top element without removing it
- **isEmpty:** Checks if the stack is empty
- **Size:** Returns the number of elements

## Implementation

```python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)
```

## Common Uses

1. **Function Call Stack:** Manages active function calls in a program
2. **Undo/Redo:** Implementing "undo" functionality in editors
3. **Expression Evaluation:** Parsing and evaluating mathematical expressions
4. **Balanced Parentheses:** Checking if parentheses are balanced
5. **Backtracking:** Storing state in recursive algorithms

## Example: Balanced Parentheses

```python
def is_balanced(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs.values():
            stack.append(char)
        elif char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False

    return len(stack) == 0
```

## Practice Problems

- Valid parentheses
- Next greater element
- Largest rectangle in histogram
- Evaluate reverse Polish notation
