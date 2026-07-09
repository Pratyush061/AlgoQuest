import { Question, Difficulty, Badge } from './types';

/* =========================
   PATTERNS (kept name TOPICS so UI doesn't break)
========================= */

export const TOPICS = [
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Prefix Sum",
  "Hash Map / Frequency",
  "Stack",
  "Linked List Techniques",
  "Tree Traversals",
  "Graph Traversal (BFS/DFS)",
  "Dynamic Programming",
  "Backtracking",
  "Greedy"
];

/* =========================
   QUESTIONS (9 per pattern)
========================= */

export const QUESTIONS: Question[] = [

/* ---------- TWO POINTERS ---------- */
{ id:'tp1', title:'Valid Palindrome', difficulty:Difficulty.EASY, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/valid-palindrome/' },
{ id:'tp2', title:'Two Sum II - Input Array Is Sorted', difficulty:Difficulty.MEDIUM, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
{ id:'tp3', title:'Container With Most Water', difficulty:Difficulty.MEDIUM, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/container-with-most-water/' },
{ id:'tp4', title:'3Sum', difficulty:Difficulty.MEDIUM, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/3sum/' },
{ id:'tp5', title:'Remove Duplicates from Sorted Array', difficulty:Difficulty.EASY, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
{ id:'tp6', title:'Sort Colors', difficulty:Difficulty.MEDIUM, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/sort-colors/' },
{ id:'tp7', title:'Trapping Rain Water', difficulty:Difficulty.HARD, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/trapping-rain-water/' },
{ id:'tp8', title:'Squares of a Sorted Array', difficulty:Difficulty.EASY, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/squares-of-a-sorted-array/' },
{ id:'tp9', title:'Partition Labels', difficulty:Difficulty.MEDIUM, topic:'Two Pointers', platform:'LeetCode', link:'https://leetcode.com/problems/partition-labels/' },

/* ---------- SLIDING WINDOW ---------- */
{ id:'sw1', title:'Best Time to Buy and Sell Stock', difficulty:Difficulty.EASY, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/' },
{ id:'sw2', title:'Longest Substring Without Repeating Characters', difficulty:Difficulty.MEDIUM, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
{ id:'sw3', title:'Permutation in String', difficulty:Difficulty.MEDIUM, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/permutation-in-string/' },
{ id:'sw4', title:'Minimum Window Substring', difficulty:Difficulty.HARD, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/minimum-window-substring/' },
{ id:'sw5', title:'Find All Anagrams in a String', difficulty:Difficulty.MEDIUM, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
{ id:'sw6', title:'Maximum Average Subarray I', difficulty:Difficulty.EASY, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/maximum-average-subarray-i/' },
{ id:'sw7', title:'Sliding Window Maximum', difficulty:Difficulty.HARD, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/sliding-window-maximum/' },
{ id:'sw8', title:'Subarrays with K Different Integers', difficulty:Difficulty.HARD, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/subarrays-with-k-different-integers/' },
{ id:'sw9', title:'Longest Repeating Character Replacement', difficulty:Difficulty.MEDIUM, topic:'Sliding Window', platform:'LeetCode', link:'https://leetcode.com/problems/longest-repeating-character-replacement/' },

/* ---------- BINARY SEARCH ---------- */
{ id:'bs1', title:'Binary Search', difficulty:Difficulty.EASY, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/binary-search/' },
{ id:'bs2', title:'Search Insert Position', difficulty:Difficulty.EASY, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/search-insert-position/' },
{ id:'bs3', title:'Search a 2D Matrix', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/search-a-2d-matrix/' },
{ id:'bs4', title:'Find Peak Element', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/find-peak-element/' },
{ id:'bs5', title:'Koko Eating Bananas', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/koko-eating-bananas/' },
{ id:'bs6', title:'Capacity To Ship Packages Within D Days', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/' },
{ id:'bs7', title:'Find Minimum in Rotated Sorted Array', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' },
{ id:'bs8', title:'Search in Rotated Sorted Array', difficulty:Difficulty.MEDIUM, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
{ id:'bs9', title:'Median of Two Sorted Arrays', difficulty:Difficulty.HARD, topic:'Binary Search', platform:'LeetCode', link:'https://leetcode.com/problems/median-of-two-sorted-arrays/' },

/* ---------- PREFIX SUM ---------- */
{ id:'ps1', title:'Running Sum of 1D Array', difficulty:Difficulty.EASY, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/running-sum-of-1d-array/' },
{ id:'ps2', title:'Range Sum Query - Immutable', difficulty:Difficulty.EASY, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/range-sum-query-immutable/' },
{ id:'ps3', title:'Subarray Sum Equals K', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/subarray-sum-equals-k/' },
{ id:'ps4', title:'Continuous Subarray Sum', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/continuous-subarray-sum/' },
{ id:'ps5', title:'Product of Array Except Self', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/product-of-array-except-self/' },
{ id:'ps6', title:'Maximum Subarray', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/maximum-subarray/' },
{ id:'ps7', title:'Count Number of Nice Subarrays', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/count-number-of-nice-subarrays/' },
{ id:'ps8', title:'Corporate Flight Bookings', difficulty:Difficulty.MEDIUM, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/corporate-flight-bookings/' },
{ id:'ps9', title:'Maximum Sum Circular Subarray', difficulty:Difficulty.HARD, topic:'Prefix Sum', platform:'LeetCode', link:'https://leetcode.com/problems/maximum-sum-circular-subarray/' },

/* ---------- HASH MAP ---------- */
{ id:'hm1', title:'Two Sum', difficulty:Difficulty.EASY, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/two-sum/' },
{ id:'hm2', title:'Contains Duplicate', difficulty:Difficulty.EASY, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/contains-duplicate/' },
{ id:'hm3', title:'Valid Anagram', difficulty:Difficulty.EASY, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/valid-anagram/' },
{ id:'hm4', title:'Group Anagrams', difficulty:Difficulty.MEDIUM, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/group-anagrams/' },
{ id:'hm5', title:'Top K Frequent Elements', difficulty:Difficulty.MEDIUM, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/top-k-frequent-elements/' },
{ id:'hm6', title:'Longest Consecutive Sequence', difficulty:Difficulty.MEDIUM, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/longest-consecutive-sequence/' },
{ id:'hm7', title:'Isomorphic Strings', difficulty:Difficulty.EASY, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/isomorphic-strings/' },
{ id:'hm8', title:'Happy Number', difficulty:Difficulty.EASY, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/happy-number/' },
{ id:'hm9', title:'Find All Duplicates in an Array', difficulty:Difficulty.MEDIUM, topic:'Hash Map / Frequency', platform:'LeetCode', link:'https://leetcode.com/problems/find-all-duplicates-in-an-array/' },

/* ---------- STACK ---------- */
{ id:'st1', title:'Valid Parentheses', difficulty:Difficulty.EASY, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/valid-parentheses/' },
{ id:'st2', title:'Min Stack', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/min-stack/' },
{ id:'st3', title:'Evaluate Reverse Polish Notation', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
{ id:'st4', title:'Daily Temperatures', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/daily-temperatures/' },
{ id:'st5', title:'Largest Rectangle in Histogram', difficulty:Difficulty.HARD, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
{ id:'st6', title:'Asteroid Collision', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/asteroid-collision/' },
{ id:'st7', title:'Remove All Adjacent Duplicates In String', difficulty:Difficulty.EASY, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/' },
{ id:'st8', title:'Decode String', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/decode-string/' },
{ id:'st9', title:'Next Greater Element II', difficulty:Difficulty.MEDIUM, topic:'Stack', platform:'LeetCode', link:'https://leetcode.com/problems/next-greater-element-ii/' },

/* ---------- DYNAMIC PROGRAMMING ---------- */
{ id:'dp1', title:'Climbing Stairs', difficulty:Difficulty.EASY, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/climbing-stairs/' },
{ id:'dp2', title:'House Robber', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/house-robber/' },
{ id:'dp3', title:'Coin Change', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/coin-change/' },
{ id:'dp4', title:'Longest Increasing Subsequence', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/longest-increasing-subsequence/' },
{ id:'dp5', title:'Longest Common Subsequence', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/longest-common-subsequence/' },
{ id:'dp6', title:'Word Break', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/word-break/' },
{ id:'dp7', title:'Partition Equal Subset Sum', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/partition-equal-subset-sum/' },
{ id:'dp8', title:'Edit Distance', difficulty:Difficulty.HARD, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/edit-distance/' },
{ id:'dp9', title:'Decode Ways', difficulty:Difficulty.MEDIUM, topic:'Dynamic Programming', platform:'LeetCode', link:'https://leetcode.com/problems/decode-ways/' },

/* ---------- LINKED LIST TECHNIQUES ---------- */
{ id:'ll1', title:'Reverse Linked List', difficulty:Difficulty.EASY, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/reverse-linked-list/' },
{ id:'ll2', title:'Linked List Cycle', difficulty:Difficulty.EASY, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/linked-list-cycle/' },
{ id:'ll3', title:'Merge Two Sorted Lists', difficulty:Difficulty.EASY, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/merge-two-sorted-lists/' },
{ id:'ll4', title:'Remove Nth Node From End of List', difficulty:Difficulty.MEDIUM, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
{ id:'ll5', title:'Reorder List', difficulty:Difficulty.MEDIUM, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/reorder-list/' },
{ id:'ll6', title:'Linked List Cycle II', difficulty:Difficulty.MEDIUM, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/linked-list-cycle-ii/' },
{ id:'ll7', title:'Intersection of Two Linked Lists', difficulty:Difficulty.EASY, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/intersection-of-two-linked-lists/' },
{ id:'ll8', title:'Merge k Sorted Lists', difficulty:Difficulty.HARD, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/merge-k-sorted-lists/' },
{ id:'ll9', title:'Reverse Nodes in k-Group', difficulty:Difficulty.HARD, topic:'Linked List Techniques', platform:'LeetCode', link:'https://leetcode.com/problems/reverse-nodes-in-k-group/' },

/* ---------- TREE TRAVERSALS ---------- */
{ id:'tt1', title:'Binary Tree Inorder Traversal', difficulty:Difficulty.EASY, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
{ id:'tt2', title:'Binary Tree Preorder Traversal', difficulty:Difficulty.EASY, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-preorder-traversal/' },
{ id:'tt3', title:'Binary Tree Postorder Traversal', difficulty:Difficulty.EASY, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-postorder-traversal/' },
{ id:'tt4', title:'Binary Tree Level Order Traversal', difficulty:Difficulty.MEDIUM, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
{ id:'tt5', title:'Binary Tree Zigzag Level Order Traversal', difficulty:Difficulty.MEDIUM, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
{ id:'tt6', title:'Binary Tree Right Side View', difficulty:Difficulty.MEDIUM, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-right-side-view/' },
{ id:'tt7', title:'Lowest Common Ancestor of a Binary Tree', difficulty:Difficulty.MEDIUM, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
{ id:'tt8', title:'Serialize and Deserialize Binary Tree', difficulty:Difficulty.HARD, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/' },
{ id:'tt9', title:'Binary Tree Maximum Path Sum', difficulty:Difficulty.HARD, topic:'Tree Traversals', platform:'LeetCode', link:'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },

/* ---------- GRAPH TRAVERSAL (BFS/DFS) ---------- */
{ id:'gt1', title:'Number of Islands', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/number-of-islands/' },
{ id:'gt2', title:'Clone Graph', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/clone-graph/' },
{ id:'gt3', title:'Course Schedule', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/course-schedule/' },
{ id:'gt4', title:'Pacific Atlantic Water Flow', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/pacific-atlantic-water-flow/' },
{ id:'gt5', title:'Number of Connected Components in an Undirected Graph', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
{ id:'gt6', title:'Graph Valid Tree', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/graph-valid-tree/' },
{ id:'gt7', title:'Word Ladder', difficulty:Difficulty.HARD, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/word-ladder/' },
{ id:'gt8', title:'Alien Dictionary', difficulty:Difficulty.HARD, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/alien-dictionary/' },
{ id:'gt9', title:'Rotting Oranges', difficulty:Difficulty.MEDIUM, topic:'Graph Traversal (BFS/DFS)', platform:'LeetCode', link:'https://leetcode.com/problems/rotting-oranges/' },

/* ---------- BACKTRACKING ---------- */
{ id:'bt1', title:'Subsets', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/subsets/' },
{ id:'bt2', title:'Combinations', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/combinations/' },
{ id:'bt3', title:'Permutations', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/permutations/' },
{ id:'bt4', title:'Combination Sum', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/combination-sum/' },
{ id:'bt5', title:'Word Search', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/word-search/' },
{ id:'bt6', title:'Palindrome Partitioning', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/palindrome-partitioning/' },
{ id:'bt7', title:'N-Queens', difficulty:Difficulty.HARD, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/n-queens/' },
{ id:'bt8', title:'Sudoku Solver', difficulty:Difficulty.HARD, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/sudoku-solver/' },
{ id:'bt9', title:'Generate Parentheses', difficulty:Difficulty.MEDIUM, topic:'Backtracking', platform:'LeetCode', link:'https://leetcode.com/problems/generate-parentheses/' },

/* ---------- GREEDY ---------- */
{ id:'gr1', title:'Jump Game', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/jump-game/' },
{ id:'gr2', title:'Jump Game II', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/jump-game-ii/' },
{ id:'gr3', title:'Gas Station', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/gas-station/' },
{ id:'gr4', title:'Candy', difficulty:Difficulty.HARD, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/candy/' },
{ id:'gr5', title:'Assign Cookies', difficulty:Difficulty.EASY, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/assign-cookies/' },
{ id:'gr6', title:'Lemonade Change', difficulty:Difficulty.EASY, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/lemonade-change/' },
{ id:'gr7', title:'Valid Parenthesis String', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/valid-parenthesis-string/' },
{ id:'gr8', title:'Non-overlapping Intervals', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/non-overlapping-intervals/' },
{ id:'gr9', title:'Minimum Number of Arrows to Burst Balloons', difficulty:Difficulty.MEDIUM, topic:'Greedy', platform:'LeetCode', link:'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },

];

/* =========================
   BADGES (pattern compatible)
========================= */

export const BADGES: Badge[] = [
  { id: 'b1', name: 'First Blood', icon: '🔥', description: 'Solve your first DSA problem' },
  { id: 'b2', name: 'Pattern Hunter', icon: '🧠', description: 'Complete 5 problems from a single pattern' },
  { id: 'b3', name: 'Consistency King', icon: '⚡', description: 'Maintain a 3-day streak' },
  { id: 'b4', name: 'DP Master', icon: '💎', description: 'Solve all Dynamic Programming problems' },
];

/* =========================
   XP
========================= */

export const XP_PER_QUESTION = {
  [Difficulty.EASY]: 100,
  [Difficulty.MEDIUM]: 250,
  [Difficulty.HARD]: 500,
};