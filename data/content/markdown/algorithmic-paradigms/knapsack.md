# Knapsack Problem

The **Knapsack problem** is a classic optimization problem: given items with weights and values, select items to maximize value while staying within weight capacity.

## Problem Types

| Type | Description | Solution |
|------|-------------|----------|
| **0/1 Knapsack** | Each item taken at most once | DP |
| **Unbounded** | Items can be taken unlimited times | DP |
| **Fractional** | Items can be split | Greedy |
| **Bounded** | Each item has a limit | DP (expanded) |

---

## 0/1 Knapsack

**Problem:** Given `n` items with weights and values, and a knapsack capacity `W`, find maximum value without exceeding capacity.

### Visual Example

```
Items: [{weight: 2, value: 3}, {weight: 3, value: 4}, {weight: 4, value: 5}]
Capacity: 5

DP Table:
        0  1  2  3  4  5  <- capacity
Item 0: 0  0  3  3  3  3
Item 1: 0  0  3  4  4  7  <- best: items 0+1, value=7
Item 2: 0  0  3  4  5  7
```

### Recursive Solution (Exponential)

```python
def knapsack_recursive(weights, values, W, n):
    """
    Time: O(2^n), Space: O(n)
    Each item: include or exclude → 2^n possibilities
    """
    # Base case
    if n == 0 or W == 0:
        return 0
    
    # If item too heavy, skip it
    if weights[n - 1] > W:
        return knapsack_recursive(weights, values, W, n - 1)
    
    # Max of including vs excluding current item
    include = values[n - 1] + knapsack_recursive(
        weights, values, W - weights[n - 1], n - 1
    )
    exclude = knapsack_recursive(weights, values, W, n - 1)
    
    return max(include, exclude)
```

### Memoization (Top-Down)

```python
def knapsack_memo(weights, values, W):
    """
    Time: O(n × W), Space: O(n × W)
    """
    n = len(weights)
    memo = {}
    
    def dp(i, remaining):
        if i == 0 or remaining == 0:
            return 0
        
        if (i, remaining) in memo:
            return memo[(i, remaining)]
        
        if weights[i - 1] > remaining:
            result = dp(i - 1, remaining)
        else:
            include = values[i - 1] + dp(i - 1, remaining - weights[i - 1])
            exclude = dp(i - 1, remaining)
            result = max(include, exclude)
        
        memo[(i, remaining)] = result
        return result
    
    return dp(n, W)
```

### Tabulation (Bottom-Up)

```python
def knapsack_dp(weights, values, W):
    """
    Time: O(n × W), Space: O(n × W)
    """
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],  # Exclude
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]  # Include
                )
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][W]
```

### Space-Optimized

```python
def knapsack_optimized(weights, values, W):
    """
    Time: O(n × W), Space: O(W)
    Key: Iterate capacity in reverse to avoid using updated values
    """
    n = len(weights)
    dp = [0] * (W + 1)
    
    for i in range(n):
        # Reverse order is crucial!
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[W]

# Get the selected items
def knapsack_with_items(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(
                    dp[i - 1][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                )
            else:
                dp[i][w] = dp[i - 1][w]
    
    # Backtrack to find items
    items = []
    w = W
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            items.append(i - 1)
            w -= weights[i - 1]
    
    return dp[n][W], items[::-1]
```

---

## Unbounded Knapsack

Each item can be used **unlimited times**.

```python
def unbounded_knapsack(weights, values, W):
    """
    Coin Change variant - items can repeat.
    Time: O(n × W), Space: O(W)
    """
    dp = [0] * (W + 1)
    
    for w in range(1, W + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[W]

# Alternative: Loop items first (same result)
def unbounded_knapsack_v2(weights, values, W):
    dp = [0] * (W + 1)
    
    for i in range(len(weights)):
        # Forward order (unlike 0/1 which uses reverse)
        for w in range(weights[i], W + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[W]
```

---

## Multi-Language Implementations

### JavaScript

```javascript
// 0/1 Knapsack - Space Optimized
function knapsack(weights, values, W) {
    const n = weights.length;
    const dp = new Array(W + 1).fill(0);
    
    for (let i = 0; i < n; i++) {
        for (let w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[W];
}

// Unbounded Knapsack
function unboundedKnapsack(weights, values, W) {
    const dp = new Array(W + 1).fill(0);
    
    for (let i = 0; i < weights.length; i++) {
        for (let w = weights[i]; w <= W; w++) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[W];
}
```

### Java

```java
// 0/1 Knapsack
public int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[] dp = new int[W + 1];
    
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[W];
}
```

### C++

```cpp
int knapsack(vector<int>& weights, vector<int>& values, int W) {
    int n = weights.size();
    vector<int> dp(W + 1, 0);
    
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    
    return dp[W];
}
```

---

## Classic Variations

### 1. Subset Sum

Can we select items to get **exactly** weight W?

```python
def subset_sum(nums, target):
    """Can we select subset summing to target?"""
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for t in range(target, num - 1, -1):
            dp[t] = dp[t] or dp[t - num]
    
    return dp[target]
```

### 2. Partition Equal Subset Sum

Can array be partitioned into two equal subsets?

```python
def can_partition(nums):
    """Partition into two equal subsets."""
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    target = total // 2
    return subset_sum(nums, target)
```

### 3. Coin Change - Minimum Coins

```python
def coin_change(coins, amount):
    """Minimum coins to make amount."""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

### 4. Coin Change II - Number of Ways

```python
def coin_change_2(coins, amount):
    """Count ways to make amount."""
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]
    
    return dp[amount]
```

### 5. Target Sum

Assign + or - to each number to reach target.

```python
def find_target_sum_ways(nums, target):
    """Number of ways to assign +/- to reach target."""
    total = sum(nums)
    if (total + target) % 2 != 0 or abs(target) > total:
        return 0
    
    # Transform: find subset with sum = (total + target) / 2
    subset_sum_target = (total + target) // 2
    
    dp = [0] * (subset_sum_target + 1)
    dp[0] = 1
    
    for num in nums:
        for t in range(subset_sum_target, num - 1, -1):
            dp[t] += dp[t - num]
    
    return dp[subset_sum_target]
```

### 6. Perfect Squares

Minimum perfect squares summing to n.

```python
def num_squares(n):
    """Minimum perfect squares summing to n."""
    squares = []
    i = 1
    while i * i <= n:
        squares.append(i * i)
        i += 1
    
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    
    for sq in squares:
        for x in range(sq, n + 1):
            dp[x] = min(dp[x], dp[x - sq] + 1)
    
    return dp[n]
```

---

## Comparison: 0/1 vs Unbounded

| Aspect | 0/1 Knapsack | Unbounded |
|--------|--------------|-----------|
| Item usage | At most once | Unlimited |
| Loop order | **Reverse** capacity | Forward capacity |
| Example | Buying unique items | Coin change |

**Why reverse for 0/1?**
- Forward order would use the same item multiple times
- Reverse ensures we only use each item once

---

## Time & Space Complexity

| Variant | Time | Space | Optimized Space |
|---------|------|-------|-----------------|
| 0/1 Knapsack | O(n × W) | O(n × W) | O(W) |
| Unbounded | O(n × W) | O(W) | O(W) |
| Subset Sum | O(n × T) | O(T) | O(T) |
| Coin Change | O(n × A) | O(A) | O(A) |

---

## Key Takeaways

1. **0/1 Knapsack**: Each item once → iterate capacity in **reverse**
2. **Unbounded**: Items repeat → iterate capacity **forward**
3. **Subset Sum** is Knapsack with boolean values
4. **Coin Change** is Unbounded Knapsack variant
5. **Space optimization**: Usually can reduce from O(n × W) to O(W)
6. **Backtracking**: Store full DP table if you need to reconstruct items
