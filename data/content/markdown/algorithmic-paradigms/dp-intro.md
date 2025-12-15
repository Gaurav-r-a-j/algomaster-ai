# Dynamic Programming Introduction

Dynamic Programming (DP) is an optimization technique that solves problems by breaking them into overlapping subproblems and storing solutions to avoid redundant computation.

## Key Concepts

### Overlapping Subproblems

The same smaller problems are solved multiple times.

### Optimal Substructure

The optimal solution can be constructed from optimal solutions of subproblems.

## Two Approaches

### Top-Down (Memoization)

Start with the original problem, break into subproblems, cache results.

```python
# Fibonacci with memoization
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]
```

### Bottom-Up (Tabulation)

Solve smallest subproblems first, build up to the original problem.

```python
# Fibonacci with tabulation
def fib(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

## DP Problem Solving Framework

1. **Define the state:** What information do we need?
2. **Define recurrence relation:** How does current state relate to previous?
3. **Define base cases:** Where does recursion stop?
4. **Determine order:** Bottom-up or top-down?
5. **Optimize space:** Can we reduce space complexity?

## Common DP Patterns

- **Linear DP:** Fibonacci, climbing stairs
- **Grid DP:** Unique paths, minimum path sum
- **String DP:** LCS, edit distance
- **Knapsack:** 0/1 knapsack, coin change
- **Interval DP:** Matrix chain multiplication

## Time Complexity

Usually: O(number of states × work per state)

## Example: Climbing Stairs

```python
def climb_stairs(n):
    if n <= 2:
        return n

    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr

    return prev1
```
