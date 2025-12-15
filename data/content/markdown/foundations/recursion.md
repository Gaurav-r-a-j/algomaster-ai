# Recursion

Recursion is a powerful technique where a function calls itself to solve a problem by breaking it down into smaller subproblems.

## The Nesting Doll Analogy

Think of recursion like a set of **Russian Nesting Dolls**.

1. You open a doll (function call) to find a smaller one inside (recursive call).
2. You keep opening them until you find the tiniest solid doll that cannot be opened (the **Base Case**).
3. Once you reach the base case, you can close them all back up (unwinding the stack).

## Real World Application

- **File Systems**: Folders can contain files and other folders. Searching for a file requires searching the current folder and recursively searching any sub-folders.
- **DNA Replication**: Biological processes often follow recursive patterns to build complex structures from simple rules.
- **Org Charts**: To find all employees under a CEO, you ask the CEO's reports, then their reports, and so on.

## Key Concepts

### Base Case

The stopping condition that prevents infinite recursion. Without it, the function would call itself forever.

### Recursive Case

The part where the function calls itself with a modified input, moving closer to the base case.

### Call Stack

The system manages recursive calls using a stack. Each recursive call is pushed onto the stack, and when the base case is reached, the stack unwinds.

## Example: Factorial

```python
def factorial(n):
    # Base case: 0! = 1 and 1! = 1
    if n <= 1:
        return 1
    # Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1)

# Example: factorial(5)
# factorial(5) = 5 * factorial(4)
# factorial(4) = 4 * factorial(3)
# factorial(3) = 3 * factorial(2)
# factorial(2) = 2 * factorial(1)
# factorial(1) = 1 (base case)
# Unwinding: 1 * 2 * 3 * 4 * 5 = 120
```

## Example: Fibonacci

```python
def fibonacci(n):
    # Base cases
    if n <= 1:
        return n
    # Recursive case: F(n) = F(n-1) + F(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2)
```

## Example: Binary Search (Recursive)

```python
def binary_search(arr, target, left, right):
    # Base case: element not found
    if left > right:
        return -1

    mid = (left + right) // 2

    # Base case: element found
    if arr[mid] == target:
        return mid

    # Recursive cases
    if arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)
```

## When to Use Recursion

**Good for:**

- Tree/graph traversals
- Divide and conquer algorithms
- Problems with recursive structure
- Backtracking

**Avoid when:**

- Simple iteration would suffice
- Stack overflow is a concern
- Performance is critical (use iteration or memoization)

## Common Pitfalls

1. **Missing Base Case:** Causes infinite recursion and stack overflow
2. **Not Approaching Base Case:** Recursive call must move toward base case
3. **Stack Overflow:** Deep recursion can exhaust stack memory

## Optimization: Memoization

```python
# Without memoization: O(2^n)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# With memoization: O(n)
memo = {}
def fibonacci_memo(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n - 1) + fibonacci_memo(n - 2)
    return memo[n]
```
