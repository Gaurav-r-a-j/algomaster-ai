# Dynamic Programming Introduction

**Dynamic Programming (DP)** is an optimization technique that solves complex problems by breaking them into overlapping subproblems, solving each subproblem once, and storing the results.

## When to Use DP?

A problem is a good candidate for DP if it has:

| Property | Description | Example |
|----------|-------------|---------|
| **Overlapping Subproblems** | Same subproblems are solved repeatedly | Fibonacci: `fib(5)` calls `fib(3)` twice |
| **Optimal Substructure** | Optimal solution built from optimal subproblems | Shortest path: optimal path uses optimal sub-paths |

---

## Two Approaches

### 1. Top-Down (Memoization)

Start with the main problem, recursively break down, and **cache** results.

```python
# Fibonacci - Top-Down
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

# Using @lru_cache (Python 3)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

### 2. Bottom-Up (Tabulation)

Solve smallest subproblems first, **build up** to the original problem.

```python
# Fibonacci - Bottom-Up
def fib(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Space-Optimized (O(1) space)
def fib_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1
```

---

## DP Problem-Solving Framework

### 5-Step Framework

1. **Define the State**
   - What variables define a subproblem?
   - What information do we need to solve it?
   - Example: `dp[i]` = max profit considering items 0 to i

2. **Find the Recurrence Relation**
   - How does `dp[i]` relate to previous states?
   - What choices do we have at each step?
   - Example: `dp[i] = max(dp[i-1], dp[i-2] + value[i])`

3. **Identify Base Cases**
   - What are the smallest subproblems?
   - Where does recursion stop?
   - Example: `dp[0] = 0`, `dp[1] = 1`

4. **Determine Iteration Order**
   - Bottom-up: smallest to largest
   - Top-down: follows recursion naturally

5. **Optimize Space** (if possible)
   - Do we need the entire table?
   - Can we use rolling array?

---

## Common DP Patterns

### Pattern 1: Linear DP

Problems where state depends on previous 1-2 states.

```python
# Climbing Stairs: dp[i] = dp[i-1] + dp[i-2]
def climb_stairs(n):
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    
    return prev1

# House Robber: Can't rob adjacent houses
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2, prev1 = 0, nums[0]
    for i in range(1, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, curr
    
    return prev1
```

### Pattern 2: Grid DP

2D problems like paths in a matrix.

```python
# Unique Paths
def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

# Minimum Path Sum
def min_path_sum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = grid[0][0]
    
    # First row
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    
    # First column
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    
    # Fill rest
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    
    return dp[m-1][n-1]
```

### Pattern 3: String DP

Problems involving string matching, editing, subsequences.

```python
# Edit Distance (Levenshtein)
def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )
    
    return dp[m][n]
```

### Pattern 4: Decision DP

Choose to include/exclude items (Knapsack variants).

```python
# 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]

# Coin Change (Minimum coins)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

### Pattern 5: Interval DP

Problems on ranges/intervals.

```python
# Matrix Chain Multiplication
def matrix_chain_order(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1]
                dp[i][j] = min(dp[i][j], cost)
    
    return dp[0][n-1]

# Palindrome Partitioning
def min_cut(s):
    n = len(s)
    is_palindrome = [[False] * n for _ in range(n)]
    
    for i in range(n):
        is_palindrome[i][i] = True
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if length == 2:
                is_palindrome[i][j] = s[i] == s[j]
            else:
                is_palindrome[i][j] = s[i] == s[j] and is_palindrome[i+1][j-1]
    
    dp = [float('inf')] * n
    for i in range(n):
        if is_palindrome[0][i]:
            dp[i] = 0
        else:
            for j in range(i):
                if is_palindrome[j+1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)
    
    return dp[n-1]
```

---

## Multi-Language Examples

### JavaScript

```javascript
// Fibonacci with memoization
function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// Climbing stairs - Bottom up
function climbStairs(n) {
    if (n <= 2) return n;
    
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}
```

### Java

```java
// Fibonacci with memoization
public int fib(int n, Map<Integer, Integer> memo) {
    if (memo.containsKey(n)) return memo.get(n);
    if (n <= 1) return n;
    
    int result = fib(n - 1, memo) + fib(n - 2, memo);
    memo.put(n, result);
    return result;
}

// Coin Change
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    
    for (int coin : coins) {
        for (int x = coin; x <= amount; x++) {
            dp[x] = Math.min(dp[x], dp[x - coin] + 1);
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}
```

### C++

```cpp
// Fibonacci with memoization
unordered_map<int, int> memo;

int fib(int n) {
    if (memo.count(n)) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

// Unique Paths
int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    
    return dp[m-1][n-1];
}
```

---

## Time & Space Complexity

| Pattern | Time | Space | Space Optimized |
|---------|------|-------|-----------------|
| Linear DP | O(n) | O(n) | O(1) |
| Grid DP | O(m×n) | O(m×n) | O(n) |
| String DP | O(m×n) | O(m×n) | O(n) |
| Knapsack | O(n×W) | O(n×W) | O(W) |
| Interval | O(n³) | O(n²) | - |

---

## Common Mistakes to Avoid

1. **Wrong base case** - Always verify edge cases
2. **Wrong iteration order** - Think about dependencies
3. **Forgetting to handle 0/empty** - Check boundary conditions
4. **Off-by-one errors** - Be careful with indices
5. **Not considering all states** - Make sure state captures all info needed

---

## Key Takeaways

1. **Identify overlapping subproblems** and optimal substructure
2. **Define state clearly** - what info defines a subproblem?
3. **Start with recursion** - then optimize with memoization
4. **Convert to bottom-up** for better space complexity
5. **Practice pattern recognition** - most problems fit common patterns
