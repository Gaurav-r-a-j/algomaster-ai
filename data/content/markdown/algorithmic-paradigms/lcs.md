# Longest Common Subsequence (LCS)

Find the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order but not necessarily contiguous.

## Example

- **X:** "ABCDGH"
- **Y:** "AEDFHR"
- **LCS:** "ADH" (length 3)

## Recursive Solution - O(2^n)

```python
def lcs_recursive(X, Y, m, n):
    if m == 0 or n == 0:
        return 0

    if X[m-1] == Y[n-1]:
        return 1 + lcs_recursive(X, Y, m-1, n-1)
    else:
        return max(
            lcs_recursive(X, Y, m-1, n),
            lcs_recursive(X, Y, m, n-1)
        )
```

## DP Solution - O(m × n)

```python
def lcs_dp(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]
```

## Reconstructing the LCS

```python
def lcs_string(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    # Backtrack to find the LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i-1] == Y[j-1]:
            lcs.append(X[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(lcs))
```

## Space Optimized - O(n)

```python
def lcs_optimized(X, Y):
    m, n = len(X), len(Y)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                curr[j] = prev[j-1] + 1
            else:
                curr[j] = max(prev[j], curr[j-1])
        prev, curr = curr, [0] * (n + 1)

    return prev[n]
```

## Related Problems

- **Longest Common Substring:** Contiguous characters
- **Edit Distance:** Minimum operations to transform
- **Shortest Common Supersequence:** Shortest string containing both
