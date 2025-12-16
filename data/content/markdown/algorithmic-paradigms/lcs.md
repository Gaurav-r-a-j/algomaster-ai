# Longest Common Subsequence (LCS)

**LCS** finds the longest subsequence common to two sequences. A **subsequence** maintains relative order but doesn't need to be contiguous.

## Visual Example

```
X: "ABCDGH"
Y: "AEDFHR"

Subsequences of X: A, AB, ACD, ABCDGH, ACH, ...
Common with Y:     A, AD, ADH, ...

LCS: "ADH" (length 3)

Alignment:
X: A B C D G H
      ↓   ↓   ↓
Y: A E D F H R
   ↑   ↑   ↑
   A   D   H ← LCS
```

---

## Algorithm Intuition

For each character pair (X[i], Y[j]):
- If they **match**: LCS includes this character
- If they **don't match**: Try skipping from X or Y, take the better result

```
Recurrence:
if X[i-1] == Y[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

---

## Recursive Solution

```python
def lcs_recursive(X, Y, m, n):
    """
    Time: O(2^n), Space: O(m + n)
    Very slow - lots of repeated subproblems
    """
    # Base case
    if m == 0 or n == 0:
        return 0
    
    # If characters match
    if X[m - 1] == Y[n - 1]:
        return 1 + lcs_recursive(X, Y, m - 1, n - 1)
    
    # If not, try both options
    return max(
        lcs_recursive(X, Y, m - 1, n),  # Skip from X
        lcs_recursive(X, Y, m, n - 1)   # Skip from Y
    )
```

---

## Memoization (Top-Down)

```python
def lcs_memo(X, Y):
    """
    Time: O(m × n), Space: O(m × n)
    """
    m, n = len(X), len(Y)
    memo = {}
    
    def dp(i, j):
        if i == 0 or j == 0:
            return 0
        
        if (i, j) in memo:
            return memo[(i, j)]
        
        if X[i - 1] == Y[j - 1]:
            result = 1 + dp(i - 1, j - 1)
        else:
            result = max(dp(i - 1, j), dp(i, j - 1))
        
        memo[(i, j)] = result
        return result
    
    return dp(m, n)
```

---

## Tabulation (Bottom-Up)

```python
def lcs_dp(X, Y):
    """
    Time: O(m × n), Space: O(m × n)
    """
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]

# Visualizing the DP table
"""
    ""  A  E  D  F  H  R
""  [0, 0, 0, 0, 0, 0, 0]
A   [0, 1, 1, 1, 1, 1, 1]
B   [0, 1, 1, 1, 1, 1, 1]
C   [0, 1, 1, 1, 1, 1, 1]
D   [0, 1, 1, 2, 2, 2, 2]
G   [0, 1, 1, 2, 2, 2, 2]
H   [0, 1, 1, 2, 2, 3, 3]

Answer: dp[6][6] = 3
"""
```

---

## Reconstructing the LCS

```python
def lcs_with_string(X, Y):
    """
    Returns both length and the actual LCS string.
    Time: O(m × n), Space: O(m × n)
    """
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    # Backtrack to find the LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            lcs.append(X[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    return dp[m][n], ''.join(reversed(lcs))

# Usage
length, lcs_str = lcs_with_string("ABCDGH", "AEDFHR")
print(f"Length: {length}, LCS: {lcs_str}")  # Length: 3, LCS: ADH
```

---

## Space-Optimized

```python
def lcs_optimized(X, Y):
    """
    Time: O(m × n), Space: O(min(m, n))
    Only keep two rows at a time.
    """
    # Ensure X is longer for space optimization
    if len(X) < len(Y):
        X, Y = Y, X
    
    m, n = len(X), len(Y)
    prev = [0] * (n + 1)
    curr = [0] * (n + 1)
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev, curr = curr, [0] * (n + 1)
    
    return prev[n]

# Even more optimized with single array
def lcs_single_array(X, Y):
    """Uses only O(n) space with single array."""
    if len(X) < len(Y):
        X, Y = Y, X
    
    m, n = len(X), len(Y)
    dp = [0] * (n + 1)
    
    for i in range(1, m + 1):
        prev = 0
        for j in range(1, n + 1):
            temp = dp[j]
            if X[i - 1] == Y[j - 1]:
                dp[j] = prev + 1
            else:
                dp[j] = max(dp[j], dp[j - 1])
            prev = temp
    
    return dp[n]
```

---

## Multi-Language Implementations

### JavaScript

```javascript
function lcs(X, Y) {
    const m = X.length, n = Y.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (X[i - 1] === Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

// With string reconstruction
function lcsWithString(X, Y) {
    const m = X.length, n = Y.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (X[i - 1] === Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack
    let lcs = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i - 1] === Y[j - 1]) {
            lcs.push(X[i - 1]);
            i--; j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return lcs.reverse().join('');
}
```

### Java

```java
public int lcs(String X, String Y) {
    int m = X.length(), n = Y.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X.charAt(i - 1) == Y.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

### C++

```cpp
int lcs(string X, string Y) {
    int m = X.length(), n = Y.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}
```

---

## Related Problems

### 1. Longest Common Substring

**Contiguous** characters (not just same order).

```python
def longest_common_substring(X, Y):
    """
    Substring must be contiguous.
    Reset to 0 on mismatch.
    """
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_len = 0
    end_pos = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > max_len:
                    max_len = dp[i][j]
                    end_pos = i
            # No else: stays 0
    
    return X[end_pos - max_len:end_pos]
```

### 2. Edit Distance (Levenshtein)

Minimum operations to transform X to Y.

```python
def edit_distance(X, Y):
    """
    Operations: insert, delete, replace
    """
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all from X
    for j in range(n + 1):
        dp[0][j] = j  # Insert all to X
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete
                    dp[i][j - 1],      # Insert
                    dp[i - 1][j - 1]   # Replace
                )
    
    return dp[m][n]
```

### 3. Shortest Common Supersequence

Shortest string containing both X and Y.

```python
def scs(X, Y):
    """
    SCS length = len(X) + len(Y) - LCS(X, Y)
    """
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Fill LCS table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    lcs_len = dp[m][n]
    return m + n - lcs_len

# Reconstruct the SCS string
def scs_string(X, Y):
    m, n = len(X), len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i - 1] == Y[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    # Build SCS by backtracking
    result = []
    i, j = m, n
    
    while i > 0 and j > 0:
        if X[i - 1] == Y[j - 1]:
            result.append(X[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            result.append(X[i - 1])
            i -= 1
        else:
            result.append(Y[j - 1])
            j -= 1
    
    while i > 0:
        result.append(X[i - 1])
        i -= 1
    while j > 0:
        result.append(Y[j - 1])
        j -= 1
    
    return ''.join(reversed(result))
```

### 4. Longest Palindromic Subsequence

LCS of string with its reverse.

```python
def longest_palindrome_subseq(s):
    """LCS(s, reverse(s))"""
    return lcs_dp(s, s[::-1])
```

### 5. Minimum Insertions to Make Palindrome

```python
def min_insertions(s):
    """
    Insert characters to make palindrome.
    = len(s) - LPS(s)
    """
    lps = lcs_dp(s, s[::-1])
    return len(s) - lps
```

---

## LCS vs LCSubstring

| Aspect | LCS (Subsequence) | LC Substring |
|--------|-------------------|--------------|
| Contiguous | No | Yes |
| On mismatch | max(skip X, skip Y) | Reset to 0 |
| Recurrence | `dp[i-1][j-1] + 1` or `max(...)` | `dp[i-1][j-1] + 1` or `0` |
| Track result | `dp[m][n]` | `max(all cells)` |

---

## Time & Space Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| Recursive | O(2^(m+n)) | O(m + n) |
| Memoization | O(m × n) | O(m × n) |
| Tabulation | O(m × n) | O(m × n) |
| Optimized | O(m × n) | O(min(m, n)) |

---

## Key Takeaways

1. **LCS is fundamental** to many string DP problems
2. **Recurrence pattern**: match → diagonal + 1, else max(left, top)
3. **Backtrack** to reconstruct the actual string
4. **Space optimization** possible with rolling arrays
5. **Common variations**: Edit distance, SCS, Palindrome problems
