# Knapsack Problem

The Knapsack problem asks: given items with weights and values, maximize value while staying within weight capacity.

## Types

### 0/1 Knapsack

Each item can only be taken once (0 or 1).

### Unbounded Knapsack

Each item can be taken unlimited times.

### Fractional Knapsack

Items can be broken into fractions (solved with greedy).

## 0/1 Knapsack

### Recursive (Exponential)

```python
def knapsack_recursive(weights, values, W, n):
    if n == 0 or W == 0:
        return 0

    if weights[n-1] > W:
        return knapsack_recursive(weights, values, W, n-1)

    # Max of including or excluding current item
    include = values[n-1] + knapsack_recursive(weights, values, W - weights[n-1], n-1)
    exclude = knapsack_recursive(weights, values, W, n-1)

    return max(include, exclude)
```

### DP Solution - O(n × W)

```python
def knapsack_dp(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],  # Exclude
                    dp[i-1][w - weights[i-1]] + values[i-1]  # Include
                )
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][W]
```

### Space Optimized - O(W)

```python
def knapsack_optimized(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)

    for i in range(n):
        for w in range(W, weights[i] - 1, -1):  # Reverse order!
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]
```

## Unbounded Knapsack

```python
def unbounded_knapsack(weights, values, W):
    dp = [0] * (W + 1)

    for w in range(1, W + 1):
        for i in range(len(weights)):
            if weights[i] <= w:
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[W]
```

## Variations

- **Subset Sum:** Can we select items to get exact weight W?
- **Partition Equal Subset Sum:** Can we partition into two equal subsets?
- **Coin Change:** Minimum coins to make amount
